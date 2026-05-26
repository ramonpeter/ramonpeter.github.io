/**
 * Fetch publications from INSPIRE-HEP at build time.
 *
 * The INSPIRE literature API is picky about author-query syntax, and the
 * accepted form has changed over time. Rather than betting on one, this
 * script tries several query forms in order and uses the first that returns
 * results. If all fail (or the network is down), it falls back to the
 * cached publications.json committed in the repo.
 *
 * No API key is needed for read access.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "src", "data");
const OUT_FILE = path.join(OUT_DIR, "publications.json");

// --- Configure who counts as "the group" --------------------------------
// Each entry needs the INSPIRE author record id (recid) and the BAI
// (the readable id, e.g. "R.Winterhalder.1"). Find both on the author's
// INSPIRE page. Add students/postdocs here as they join.
//
// Ramon's profile: https://inspirehep.net/authors/1794691
const AUTHORS = [
  { recid: "1794691", bai: "R.Winterhalder.1" },
];

const SIZE = 250; // INSPIRE caps page size at 1000

const FIELDS = [
  "titles",
  "authors.full_name",
  "arxiv_eprints",
  "publication_info",
  "citation_count",
  "earliest_date",
  "dois",
  "control_number",
  "document_type",
].join(",");

/**
 * Candidate query strings, tried in order. Different INSPIRE versions
 * accept different author operators; the first one returning hits wins.
 */
function candidateQueries() {
  const recids = AUTHORS.map((a) => a.recid);
  const bais = AUTHORS.map((a) => a.bai).filter(Boolean);
  return [
    // by author record id (current preferred form)
    recids.map((id) => `authors.record.$ref:${id}`).join(" or "),
    // by BAI via the author operator
    bais.length ? bais.map((b) => `a ${b}`).join(" or ") : null,
    // by recid via the author operator (older form)
    recids.map((id) => `a recid:${id}`).join(" or "),
  ].filter(Boolean);
}

function apiUrl(query) {
  const params = new URLSearchParams({
    q: query,
    sort: "mostrecent",
    size: String(SIZE),
    fields: FIELDS,
  });
  return `https://inspirehep.net/api/literature?${params.toString()}`;
}

function normalise(hit) {
  const m = hit.metadata ?? {};
  const arxiv = m.arxiv_eprints?.[0]?.value ?? null;
  const pub = m.publication_info?.find((p) => p.journal_title) ?? null;
  const journal = pub
    ? [pub.journal_title, pub.journal_volume, pub.year && `(${pub.year})`]
        .filter(Boolean)
        .join(" ")
    : null;

  return {
    id: m.control_number,
    title: m.titles?.[0]?.title ?? "Untitled",
    authors: (m.authors ?? []).map((a) => a.full_name),
    date: m.earliest_date ?? null,
    arxiv,
    arxivUrl: arxiv ? `https://arxiv.org/abs/${arxiv}` : null,
    doi: m.dois?.[0]?.value ?? null,
    journal,
    citations: m.citation_count ?? 0,
    inspireUrl: `https://inspirehep.net/literature/${m.control_number}`,
    type: m.document_type?.[0] ?? "article",
  };
}

async function tryFetch(query) {
  const url = apiUrl(query);
  console.log(`[pubs] trying query: ${query}`);
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`INSPIRE responded ${res.status}`);
  const json = await res.json();
  return json.hits?.hits ?? [];
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  try {
    let hits = [];
    for (const query of candidateQueries()) {
      try {
        hits = await tryFetch(query);
      } catch (e) {
        console.warn(`[pubs]   query errored: ${e.message}`);
        continue;
      }
      if (hits.length > 0) {
        console.log(`[pubs]   -> ${hits.length} records`);
        break;
      }
      console.log("[pubs]   -> 0 records, trying next form");
    }

    if (hits.length === 0) throw new Error("no query form returned records");

    const pubs = hits
      .map(normalise)
      .filter((p) => p.type === "article" || p.type === "conference paper")
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

    if (pubs.length === 0) throw new Error("records found but none were articles");

    await writeFile(OUT_FILE, JSON.stringify(pubs, null, 2) + "\n");
    console.log(`[pubs] wrote ${pubs.length} publications -> ${OUT_FILE}`);
  } catch (err) {
    console.warn(`[pubs] fetch failed: ${err.message}`);
    if (existsSync(OUT_FILE)) {
      const cached = JSON.parse(await readFile(OUT_FILE, "utf8"));
      console.warn(`[pubs] keeping cached file (${cached.length} publications)`);
    } else {
      await writeFile(OUT_FILE, "[]\n");
      console.warn("[pubs] no cache available -- wrote empty list");
    }
  }
}

main();

# ML for LHC Physics — group website

Astro site. Publications are fetched from INSPIRE-HEP at build time.

## Local development
```
npm install
npm run dev      # fetches publications, then starts dev server
```

## Adding content
- **People**: add a Markdown file in `src/content/people/`
- **Projects**: add a Markdown file in `src/content/projects/`
- **News**: add a Markdown file in `src/content/news/`
- **Research themes**: edit files in `src/content/research/`

## Publications
`scripts/fetch-publications.mjs` queries INSPIRE-HEP for the author IDs listed
in `AUTHOR_RECIDS`. Add group members' INSPIRE recids there so their papers
appear automatically. The result is cached in `src/data/publications.json` and
committed — if INSPIRE is unreachable during a build, the cached copy is used.

## Deployment
`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push
and once a week (so new papers appear without a manual push).

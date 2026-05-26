import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const people = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    role: z.enum(["pi", "postdoc", "phd", "master", "alumni"]),
    title: z.string().optional(),
    photo: z.string().optional(),
    email: z.string().optional(),
    inspire: z.string().url().optional(),
    github: z.string().url().optional(),
    scholar: z.string().url().optional(),
    orcid: z.string().url().optional(),
    unimi: z.string().url().optional(),
    // a short personal line ("when not doing physics, ...")
    note: z.string().optional(),
    // compact CV timeline, grouped — only used for the PI
    history: z
      .array(
        z.object({
          group: z.string(), // e.g. "Appointments", "Education"
          items: z.array(
            z.object({
              role: z.string(),
              place: z.string(),
              years: z.string(),
              detail: z.string().optional(),
            })
          ),
        })
      )
      .optional(),
    // lower = listed first within a role group
    order: z.number().default(99),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string().optional(),
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(["master", "phd", "postdoc"]).default("master"),
    blurb: z.string(),
    skills: z.array(z.string()).default([]),
    open: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tag: z.enum(["paper", "people", "talk", "award", "misc"]).default("misc"),
    link: z.string().url().optional(),
  }),
});

export const collections = { people, research, projects, news };

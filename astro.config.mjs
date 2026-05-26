import { defineConfig } from "astro/config";

// User site (ramonpeter.github.io) lives at the domain root, so no `base`.
export default defineConfig({
  site: "https://ramonpeter.github.io",
  trailingSlash: "ignore",
});

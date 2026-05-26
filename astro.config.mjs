import { defineConfig } from "astro/config";

// Site is served from the domain root, so no `base` is needed.
export default defineConfig({
  site: "https://www.rpwinterhalder.com",
  trailingSlash: "ignore",
});

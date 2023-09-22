import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1028,
  viewportHeight: 660,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

/* eslint-disable */

import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'oixxyt',
  e2e: {
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
    },
  },
});

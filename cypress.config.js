/* eslint-disable */
//TEST
import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'oixxyt',
  e2e: {
    baseUrl: 'http://localhost:5173',
    // baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
    },
  },
});

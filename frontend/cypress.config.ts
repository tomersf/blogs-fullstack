import { defineConfig } from "cypress";

import config from "./src/config/index";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/",
  },
  video: false,
  env: {
    BACKEND_REGISTER: config.registerUrl,
    BACKEND_LOGIN: config.loginUrl,
    BACKEND_BLOGS: config.blogsUrl,
  },
});

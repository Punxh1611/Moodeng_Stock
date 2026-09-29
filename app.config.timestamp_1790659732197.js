// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "./app"
  },
  vite: {
    plugins: [
      viteTsConfigPaths(),
      tailwindcss()
    ]
  }
});
export {
  app_config_default as default
};

import { defineConfig } from '@tanstack/react-start/config'
import tailwindcss from '@tailwindcss/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: './app',
  },
  vite: {
    plugins: [
      viteTsConfigPaths(),
      tailwindcss(),
    ],
  },
})

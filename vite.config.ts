import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: 'app',
    }),
    react(),
    viteTsConfigPaths(),
    tailwindcss(),
  ],
})

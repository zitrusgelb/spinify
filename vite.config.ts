import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'node:path'

export default defineConfig({
  plugins: [vike(), react({}), tailwindcss(), tsconfigPaths()],
  build: {
    target: 'es2022',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      assets: path.resolve(__dirname, 'assets'),
      api: path.resolve(__dirname, 'api'),
      utils: path.resolve(__dirname, 'utils'),
      hooks: path.resolve(__dirname, 'hooks'),
      layouts: path.resolve(__dirname, 'layouts'),
    },
  },
})

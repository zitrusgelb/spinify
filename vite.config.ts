import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import vike from "vike/plugin"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [vike(), react({}), tailwindcss(), svgr()],
  build: {
    target: "es2022",
  },
})

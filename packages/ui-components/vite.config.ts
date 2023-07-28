import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ("./src/index.tsx"),
      formats: ["es"],
      name: "ui-components",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      }
    },
  },
  plugins: [react(), dts()],
})

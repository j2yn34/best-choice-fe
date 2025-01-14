import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://www.winnow-bestchoice.com:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      // "/ws-stomp": {
      //   target: "ws://www.winnow-bestchoice.com:8080/ws-stomp",
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
});

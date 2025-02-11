import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";

import { injectFontsToHead } from "./fontPreload";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            inject: {
                tags: injectFontsToHead,
            },
        }),
    ],
});

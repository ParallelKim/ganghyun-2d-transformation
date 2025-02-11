import { readdirSync } from "fs";
import { resolve } from "path";

import { HtmlTagDescriptor } from "vite";

const fontsDirectory = resolve(__dirname, "./public");

const fontFiles = readdirSync(fontsDirectory).filter(
    (file) => file.endsWith(".ttf") || file.endsWith(".woff2")
);

export const injectFontsToHead: HtmlTagDescriptor[] = fontFiles.map(
    (fontFile) => ({
        injectTo: "head",
        tag: "link",
        attrs: {
            rel: "preload",
            href: `/${fontFile}`,
            as: "font",
            type: fontFile.endsWith(".ttf") ? "font/ttf" : "font/woff2",
            crossOrigin: "anonymous",
        },
    })
);

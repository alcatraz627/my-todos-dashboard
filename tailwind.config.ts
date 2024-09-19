import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  safelist: [
    "btn-primary",
    "btn-secondary",
    "btn-success",
    "btn-info",
    "btn-error",
    "btn-neutral",
    "btn-warning",
    "btn-ghost",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["night"],
    // themes: [
    //   {
    //     sunset: {
    //       // eslint-disable-next-line @typescript-eslint/no-var-requires
    //       ...require("daisyui/src/theming/themes")["sunset"],
    //       // secondary: "",
    //     },
    //   },
    // ],
  },
};
export default config;

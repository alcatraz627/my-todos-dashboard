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
    "primary",
    "secondary",
    "success",
    "info",
    "error",
    "neutral",
    "warning",
    "ghost",
  ]
    .map((v) => [`btn`, `border`, "text", "bg"].map((p) => `${p}-${v}`))
    .flatMap((v) => v),
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00b9ff",
          "primary-content": "#f3f4f6",
          secondary: "#eab308",
          accent: "#db2777",
          neutral: "#374151",
          "base-100": "#062d3c",
          "base-200": "#042633",
          "base-300": "#031f2a",
          info: "#7e22ce",
          success: "#008300",
          warning: "#ea580c",
          error: "#e11d48",
        },
      },
    ],
    // themes: ["light"],
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

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-green-strong": "#002d2a",
        "custom-green-normal": "#115e2a",
        "custom-green-obscure": "#155219",
        "custom-green-slight": "#69a54b",
        "custom-green-palid": "#66a72f",
        "custom-green": "#2e8a57",
        "custom-green-alive": "#008001",
        "custom-greenblue": "#114445",
        "custom-green-light": "#02af72",
        "custom-green-fluor": "#91ed91",
        "custom-yellow-light": "#f9f270",
        "custom-red-obscure": "#570101",
        "custom-gray-slight": "#d5d5d5",
        "custom-gray-obscure": "#797979",
        "custom-black": "#000000",
        "custom-white": "#ffffff",
        "custom-white-palid": "#e5e5e5",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        monzo: ["var(--font-monzo)", ...fontFamily.sans],
        brSonoma: ["var(--font-br-sonoma)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColo: string[] = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping: Record<string, string> = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

interface ThemeColors {
  [color: string]: Record<string, string>;
}

const isColorObject = (color: unknown): color is Record<string, string> => {
  return typeof color === "object" && color !== null;
};

const filterColors = (
  colors: Record<string, unknown>
): Record<string, Record<string, string>> => {
  const filtered: Record<string, Record<string, string>> = {};
  Object.entries(colors).forEach(([key, value]) => {
    if (isColorObject(value)) {
      filtered[key] = value as Record<string, string>;
    }
  });
  return filtered;
};

const generateThemeObject = (
  colors: Record<string, Record<string, string>>,
  mapping: Record<string, string>,
  invert = false
): ThemeColors => {
  const theme: ThemeColors = {};

  baseColo.forEach((color) => {
    if (!colors[color]) return;

    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color][shadeKey] || "";
    });
  });

  return theme;
};

const filteredColors = filterColors(
  colors as unknown as Record<string, unknown>
);

const lightTheme = generateThemeObject(filteredColors, shadeMapping);
const darkTheme = generateThemeObject(filteredColors, shadeMapping, true);

const themes = {
  light: { ...lightTheme, white: "#ffffff" },
  dark: {
    ...darkTheme,
    white: colors.gray[950],
    black: colors.gray[50],
  },
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
} satisfies Config;

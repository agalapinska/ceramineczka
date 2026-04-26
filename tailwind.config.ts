import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        ink: "var(--color-ink)",
        "ink-60": "var(--color-ink-60)",
        "ink-20": "var(--color-ink-20)",
      },
      fontFamily: {
        display: "var(--font-display)",
        accent: "var(--font-accent)",
        body: "var(--font-body)",
      },
      fontSize: {
        "display-xl": ["var(--fs-display-xl)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-l": ["var(--fs-display-l)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-m": ["var(--fs-display-m)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-s": ["var(--fs-display-s)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "body-l": ["var(--fs-body-l)", { lineHeight: "1.4" }],
        "body-m": ["var(--fs-body-m)", { lineHeight: "1.4" }],
        caption: ["var(--fs-caption)", { lineHeight: "1.2", letterSpacing: "0.02em" }],
      },
      spacing: {
        "s1": "var(--space-1)",
        "s2": "var(--space-2)",
        "s3": "var(--space-3)",
        "s4": "var(--space-4)",
        "s5": "var(--space-5)",
        "s6": "var(--space-6)",
        "s7": "var(--space-7)",
      },
      borderRadius: { none: "0" },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  // Hover tylko na urządzeniach z kursorem — bez „przyklejonych” stanów po tapnięciu.
  future: { hoverOnlyWhenSupported: true },
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        cream: "var(--color-cream)",
        canvas: "var(--color-canvas)",
        ink: "var(--color-ink)",
        line: "var(--color-line)",
        "ink-60": "var(--color-ink-60)",
        "ink-20": "var(--color-ink-20)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      fontSize: {
        "display-xl": ["var(--fs-display-xl)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-l": ["var(--fs-display-l)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-m": ["var(--fs-display-m)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-s": ["var(--fs-display-s)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "body-l": ["var(--fs-body-l)", { lineHeight: "1.6" }],
        "body-m": ["var(--fs-body-m)", { lineHeight: "1.6" }],
        caption: ["var(--fs-caption)", { lineHeight: "1.3", letterSpacing: "0.04em" }],
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
      maxWidth: { frame: "90rem" },
      borderRadius: { none: "0" },
    },
  },
  plugins: [],
};

export default config;

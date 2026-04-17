import { defineConfig, defineGlobalStyles, defineKeyframes } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          seaInk: { value: "#173a40" },
          seaInkSoft: { value: "#416166" },
          lagoon: { value: "#4fb8b2" },
          lagoonDeep: { value: "#328f97" },
          palm: { value: "#2f6a4a" },
          sand: { value: "#e7f0e8" },
          foam: { value: "#f3faf5" },
          bgBase: { value: "#e7f3ec" },
          line: { value: "rgba(23, 58, 64, 0.14)" },
          surface: { value: "rgba(255, 255, 255, 0.74)" },
          surfaceStrong: { value: "rgba(255, 255, 255, 0.9)" },
          insetGlint: { value: "rgba(255, 255, 255, 0.82)" },
          headerBg: { value: "rgba(251, 255, 248, 0.84)" },
          chipBg: { value: "rgba(255, 255, 255, 0.8)" },
          chipLine: { value: "rgba(47, 106, 74, 0.18)" },
          linkBgHover: { value: "rgba(255, 255, 255, 0.9)" },
          kicker: { value: "rgba(47, 106, 74, 0.9)" },
          heroA: { value: "rgba(79, 184, 178, 0.36)" },
          heroB: { value: "rgba(47, 106, 74, 0.2)" },
        },
        fonts: {
          body: { value: "\"Manrope\", ui-sans-serif, system-ui, sans-serif" },
          display: { value: "\"Fraunces\", Georgia, serif" },
        },
        shadows: {
          island: {
            value:
              "0 1px 0 token(colors.insetGlint) inset, 0 22px 44px rgba(30, 90, 72, 0.1), 0 6px 18px rgba(23, 58, 64, 0.08)",
          },
          feature: {
            value:
              "0 1px 0 token(colors.insetGlint) inset, 0 18px 34px rgba(30, 90, 72, 0.1), 0 4px 14px rgba(23, 58, 64, 0.06)",
          },
        },
        animations: {
          riseIn: { value: "rise-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both" },
        },
      },
      keyframes: defineKeyframes({
        "rise-in": {
          from: {
            opacity: "0",
            transform: "translateY(12px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      }),
    },
  },
  globalCss: defineGlobalStyles({
    "html, body, #app": {
      minHeight: "100%",
    },
    body: {
      margin: 0,
      overflowX: "hidden",
      color: "seaInk",
      fontFamily: "body",
      backgroundColor: "bgBase",
      background: `
        radial-gradient(1100px 620px at -8% -10%, token(colors.heroA), transparent 58%),
        radial-gradient(1050px 620px at 112% -12%, token(colors.heroB), transparent 62%),
        radial-gradient(720px 380px at 50% 115%, rgba(79, 184, 178, 0.1), transparent 68%),
        linear-gradient(
          180deg,
          color-mix(in oklab, token(colors.sand) 68%, white) 0%,
          token(colors.foam) 44%,
          token(colors.bgBase) 100%
        )
      `,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    a: {
      color: "lagoonDeep",
      textDecorationColor: "rgba(50, 143, 151, 0.4)",
      textDecorationThickness: "1px",
      textUnderlineOffset: "2px",
      _hover: {
        color: "#246f76",
      },
    },
    code: {
      borderWidth: "1px",
      borderColor: "line",
      borderRadius: "7px",
      bg: "color-mix(in oklab, token(colors.surfaceStrong) 82%, white 18%)",
      px: "7px",
      py: "2px",
      fontSize: "0.9em",
    },
  }),
  outdir: "styled-system",
  jsxFramework: "solid",
});

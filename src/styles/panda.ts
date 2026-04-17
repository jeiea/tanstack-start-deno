import { css, cx } from "../../styled-system/css/index.mjs";

export const pageWrapClass = css({
  width: "min(1080px, calc(100% - 2rem))",
  mx: "auto",
});

export const displayTitleClass = css({
  fontFamily: "display",
});

export const islandShellClass = css({
  borderWidth: "1px",
  borderColor: "line",
  background: "linear-gradient(165deg, token(colors.surfaceStrong), token(colors.surface))",
  boxShadow: "island",
  backdropFilter: "blur(4px)",
});

export const featureCardShellClass = cx(
  islandShellClass,
  css({
    background:
      "linear-gradient(165deg, color-mix(in oklab, token(colors.surfaceStrong) 93%, white 7%), token(colors.surface))",
    boxShadow: "feature",
  }),
);

export const siteHeaderClass = css({
  position: "sticky",
  top: 0,
  zIndex: 50,
  borderBottomWidth: "1px",
  borderBottomColor: "line",
  background: "headerBg",
  backdropFilter: "blur(10px)",
});

export const brandPillClass = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "9999px",
  borderWidth: "1px",
  borderColor: "chipLine",
  background: "chipBg",
  px: "0.875rem",
  py: "0.5rem",
  color: "seaInk",
  textDecoration: "none",
  boxShadow: "0 8px 24px rgba(30, 90, 72, 0.08)",
});

export const brandDotClass = css({
  h: "0.5rem",
  w: "0.5rem",
  borderRadius: "9999px",
  background: "linear-gradient(90deg, #56c6be, #7ed3bf)",
});

export const islandKickerClass = css({
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: "0.69rem",
  color: "kicker",
});

const navLinkBaseClass = css({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  color: "seaInkSoft",
  textDecoration: "none",
  transitionProperty: "color",
  transitionDuration: "170ms",
  "&::after": {
    content: "\"\"",
    position: "absolute",
    left: 0,
    bottom: "-6px",
    width: "100%",
    height: "2px",
    transform: "scaleX(0)",
    transformOrigin: "left",
    background: "linear-gradient(90deg, token(colors.lagoon), #7ed3bf)",
    transition: "transform 170ms ease",
  },
  "&:hover, &.is-active": {
    color: "seaInk",
  },
  "&:hover::after, &.is-active::after": {
    transform: "scaleX(1)",
  },
});

export const navLinkClass = navLinkBaseClass;

export const summaryNavLinkClass = cx(
  navLinkBaseClass,
  css({
    cursor: "pointer",
    listStyle: "none",
  }),
);

export const riseInClass = css({
  animation: "riseIn",
});

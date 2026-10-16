import { Easing } from "remotion";

export const theme = {
  colors: {
    bg:      "#07111F",
    bgAlt:   "#0F1E35",
    bgPanel: "#162840",
    // Hero per scene — violet for cloud/motion topic
    primary: "#8B5CF6",
    accent:  "#22D3EE",
    accentB: "#F59E0B",
    text:    "#F4F4F5",
    textDim: "#8BA5C0",
    success: "#10B981",
    danger:  "#EF4444",
    glow:    "rgba(139,92,246,0.38)",
    glowC:   "rgba(34,211,238,0.28)",
    glowO:   "rgba(245,158,11,0.32)",
    white:   "#FFFFFF",
  },
  // Per-scene hero overrides
  sceneColors: {
    hook:     { hero: "#8B5CF6", glow: "rgba(139,92,246,0.35)" },
    problem:  { hero: "#EF4444", glow: "rgba(239,68,68,0.30)"  },
    solution: { hero: "#10B981", glow: "rgba(16,185,129,0.30)" },
    features: { hero: "#F59E0B", glow: "rgba(245,158,11,0.32)" },
    cta:      { hero: "#8B5CF6", glow: "rgba(139,92,246,0.38)" },
  },
  fonts: {
    display: "'Noto Sans Bengali', 'Noto Sans', sans-serif",
    body:    "'Noto Sans Bengali', 'Noto Sans', sans-serif",
  },
  ease: {
    out:   Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in:    Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90,  mass: 1   },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;

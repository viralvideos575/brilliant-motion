// theme.ts — Brilliant Connect brand theme
// Single source of truth. Never inline colors in components.
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#07111F",           // deepest navy
    bgAlt: "#0F2035",        // card surfaces
    bgPanel: "#1C3A56",      // Brilliant Connect brand navy
    primary: "#F06E6E",      // Brilliant coral (brand)
    accent: "#F59E0B",       // OpenVPN orange
    accentB: "#22D3EE",      // cyber-cyan (calling/signal)
    text: "#F1F5F9",         // near-white
    textDim: "#8BAFC8",      // muted blue-grey
    glow: "rgba(240,110,110,0.35)",
    glowOrange: "rgba(245,158,11,0.4)",
    glowCyan: "rgba(34,211,238,0.3)",
    danger: "#EF4444",       // problem/error red
    success: "#10B981",      // solution/check green
    white: "#FFFFFF",
  },
  fonts: {
    display: "'Hind Siliguri', 'FreeSans', sans-serif",
    body: "'Hind Siliguri', 'FreeSans', sans-serif",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90,  mass: 1   },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;

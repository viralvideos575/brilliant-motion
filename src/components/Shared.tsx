import React from "react";
import {
  AbsoluteFill, Audio, interpolate, spring,
  staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ─── BG MESH ─────────────────────────────────── */
export const BgMesh: React.FC<{
  heroColor?: string; accentColor?: string; bgColor?: string;
}> = ({
  heroColor  = theme.colors.primary,
  accentColor = theme.colors.accent,
  bgColor    = theme.colors.bg,
}) => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 55) * 55;
  const d2 = Math.cos(frame / 70) * 45;
  return (
    <AbsoluteFill style={{ background: bgColor }}>
      <div style={{
        position:"absolute", width:900, height:900, borderRadius:"50%",
        top:-350, left:-200 + d1, filter:"blur(55px)",
        background:`radial-gradient(circle,${heroColor}30,transparent 62%)`,
      }}/>
      <div style={{
        position:"absolute", width:700, height:700, borderRadius:"50%",
        bottom:-300, right:-200 - d2, filter:"blur(70px)",
        background:`radial-gradient(circle,${accentColor}20,transparent 65%)`,
      }}/>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(180deg,rgba(0,0,0,0.12) 0%,transparent 30%,transparent 70%,rgba(0,0,0,0.22) 100%)",
      }}/>
    </AbsoluteFill>
  );
};

/* ─── GRADE ────────────────────────────────────── */
export const Grade: React.FC<{ heroColor?: string }> = ({
  heroColor = theme.colors.primary,
}) => (
  <AbsoluteFill style={{ pointerEvents:"none", zIndex:80 }}>
    <AbsoluteFill style={{
      backgroundColor: heroColor,
      mixBlendMode:"soft-light", opacity:0.12,
    }}/>
    <AbsoluteFill style={{
      background:"linear-gradient(180deg,rgba(0,0,0,0.1) 0%,transparent 25%,transparent 75%,rgba(0,0,0,0.18) 100%)",
    }}/>
  </AbsoluteFill>
);

/* ─── GRAIN ────────────────────────────────────── */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill style={{
      pointerEvents:"none", zIndex:99,
      backgroundImage: noise, backgroundSize:"220px",
      backgroundPosition:`${(frame*7)%220}px ${(frame*13)%220}px`,
      opacity:0.048, mixBlendMode:"overlay",
    }}/>
  );
};

/* ─── VIGNETTE ─────────────────────────────────── */
export const Vignette: React.FC = () => (
  <AbsoluteFill style={{
    pointerEvents:"none", zIndex:98,
    background:"radial-gradient(ellipse at center,transparent 52%,rgba(0,0,0,0.30) 100%)",
  }}/>
);

/* ─── ENTRANCE ─────────────────────────────────── */
export const Entrance: React.FC<{
  delay?: number; dy?: number; scale?: boolean;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay=0, dy=40, scale=true, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring.smooth });
  return (
    <div style={{
      opacity: p,
      transform: `translateY(${interpolate(p,[0,1],[dy,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)${scale ? ` scale(${interpolate(p,[0,1],[0.93,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})})` : ""}`,
      ...style,
    }}>{children}</div>
  );
};

/* ─── EXIT WRAP ────────────────────────────────── */
export const ExitWrap: React.FC<{
  exitAt: number; dur?: number;
  children: React.ReactNode; style?: React.CSSProperties;
}> = ({ exitAt, dur=10, children, style }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame,[exitAt-dur,exitAt],[1,0],{easing:theme.ease.in,extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const y = interpolate(frame,[exitAt-dur,exitAt],[0,-35],{easing:theme.ease.in,extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  return <div style={{ opacity:o, transform:`translateY(${y}px)`, ...style }}>{children}</div>;
};

/* ─── WORD REVEAL ──────────────────────────────── */
export const WordReveal: React.FC<{
  text: string; delay?: number; per?: number;
  style?: React.CSSProperties;
  highlightWords?: string[]; highlightColor?: string;
}> = ({ text, delay=0, per=4, style, highlightWords=[], highlightColor=theme.colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28em", letterSpacing:0, ...style }}>
      {words.map((word, i) => {
        const p = spring({ frame:frame-delay-i*per, fps, config:theme.spring.snappy });
        const isHL = highlightWords.some(hw => word.includes(hw));
        return (
          <span key={i} style={{
            display:"inline-block", opacity:p,
            transform:`translateY(${interpolate(p,[0,1],[32,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
            color: isHL ? highlightColor : undefined,
            textShadow: isHL ? `0 0 40px ${highlightColor}66` : undefined,
          }}>{word}</span>
        );
      })}
    </div>
  );
};

/* ─── LABEL BAR ────────────────────────────────── */
export const LabelBar: React.FC<{
  text: string; delay?: number; color?: string;
}> = ({ text, delay=0, color=theme.colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame:frame-delay, fps, config:theme.spring.smooth });
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:16,
      opacity:p, transform:`translateX(${interpolate(p,[0,1],[-24,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
      marginBottom:28,
    }}>
      <div style={{ width:4, height:22, borderRadius:2, background:color }}/>
      <span style={{
        fontFamily:theme.fonts.body, fontSize:16, fontWeight:700,
        color, letterSpacing:3, textTransform:"uppercase" as const,
      }}>{text}</span>
    </div>
  );
};

/* ─── GLASS CARD ───────────────────────────────── */
export const GlassCard: React.FC<{
  children: React.ReactNode; style?: React.CSSProperties;
  delay?: number; glowColor?: string;
}> = ({ children, style, delay=0, glowColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame:frame-delay, fps, config:theme.spring.smooth });
  const breathe = 1 + Math.sin(frame / 22) * 0.010;
  return (
    <div style={{
      background:"rgba(15,28,52,0.85)",
      backdropFilter:"blur(20px)",
      border:"1px solid rgba(255,255,255,0.09)",
      borderRadius:28,
      boxShadow: glowColor
        ? `0 0 40px ${glowColor}22, 0 20px 50px rgba(0,0,0,0.5)`
        : "0 20px 50px rgba(0,0,0,0.5)",
      opacity:p,
      transform:`translateY(${interpolate(p,[0,1],[36,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px) scale(${interpolate(p,[0,1],[0.94,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})*breathe})`,
      ...style,
    }}>{children}</div>
  );
};

/* ─── DIVIDER LINE ─────────────────────────────── */
export const DivLine: React.FC<{ delay?: number; color?: string }> = ({
  delay=0, color=theme.colors.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame:frame-delay, fps, config:theme.spring.smooth });
  return (
    <div style={{
      height:2, borderRadius:2, marginBottom:24,
      width:`${interpolate(p,[0,1],[0,100],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}%`,
      background:`linear-gradient(90deg,${color},transparent)`,
    }}/>
  );
};

/* ─── SFX AUDIO ────────────────────────────────── */
export const Sfx: React.FC<{ src:string; from:number; volume?:number }> = ({
  src, from, volume=0.28,
}) => {
  const frame = useCurrentFrame();
  if (frame !== from) return null;
  return <Audio src={staticFile(src)} volume={volume} />;
};

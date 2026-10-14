import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// ─── BG MESH ─────────────────────────────────────────────────────────────────
export const BgMesh: React.FC<{ variant?: "hero" | "warn" | "solve" | "pay" }> = ({
  variant = "hero",
}) => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 55) * 60;
  const d2 = Math.cos(frame / 70) * 45;

  const c1 =
    variant === "warn"
      ? theme.colors.danger
      : variant === "solve"
      ? theme.colors.accent
      : variant === "pay"
      ? theme.colors.accentB
      : theme.colors.primary;
  const c2 =
    variant === "warn"
      ? theme.colors.primary
      : variant === "solve"
      ? theme.colors.primary
      : theme.colors.accentB;

  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          borderRadius: "50%",
          top: -600,
          left: -400 + d1,
          filter: "blur(55px)",
          background: `radial-gradient(circle, ${c1}28, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          bottom: -450,
          right: -300 - d2,
          filter: "blur(70px)",
          background: `radial-gradient(circle, ${c2}20, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(7,17,31,0.0) 0%, rgba(28,58,86,0.12) 50%, rgba(7,17,31,0.0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── GRADE ───────────────────────────────────────────────────────────────────
export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", zIndex: 80 }}>
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primary,
        mixBlendMode: "soft-light",
        opacity: 0.10,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.22) 100%)",
      }}
    />
  </AbsoluteFill>
);

// ─── GRAIN ───────────────────────────────────────────────────────────────────
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 99,
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.045,
        mixBlendMode: "overlay",
      }}
    />
  );
};

// ─── VIGNETTE ────────────────────────────────────────────────────────────────
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      zIndex: 98,
      background:
        "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.28) 100%)",
    }}
  />
);

// ─── ENTRANCE ────────────────────────────────────────────────────────────────
export const Entrance: React.FC<{
  delay?: number;
  dy?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, dy = 40, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.smooth,
  });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [dy, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── WORD REVEAL (Bengali-safe: word split only) ──────────────────────────────
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  per?: number;
  style?: React.CSSProperties;
  color?: string;
  highlightWord?: string;
  highlightColor?: string;
}> = ({
  text,
  delay = 0,
  per = 4,
  style,
  color,
  highlightWord,
  highlightColor = theme.colors.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.28em",
        letterSpacing: 0,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const p = spring({
          frame: frame - delay - i * per,
          fps,
          config: theme.spring.snappy,
        });
        const isHL = highlightWord && word.includes(highlightWord);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [28, 0])}px)`,
              color: isHL ? highlightColor : color,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ─── EXIT WRAPPER ─────────────────────────────────────────────────────────────
export const ExitWrap: React.FC<{
  exitAt: number;
  dur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ exitAt, dur = 10, children, style }) => {
  const frame = useCurrentFrame();
  const exitO = interpolate(frame, [exitAt - dur, exitAt], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [exitAt - dur, exitAt], [0, -28], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity: exitO,
        transform: `translateY(${exitY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── LOGO CARD ────────────────────────────────────────────────────────────────
export const LogoCard: React.FC<{
  src: string;
  delay?: number;
  size?: number;
  bg?: string;
  label?: string;
  sfxSrc?: string;
}> = ({ src, delay = 0, size = 120, bg = "transparent", label, sfxSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 22) * 0.012;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {sfxSrc && frame === delay && (
        <Audio src={staticFile(sfxSrc)} volume={0.28} />
      )}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: p,
          transform: `scale(${interpolate(p, [0, 1], [0.5, 1]) * breathe}) rotate(${interpolate(p, [0, 1], [-15, 0])}deg)`,
          boxShadow: `0 0 40px ${theme.colors.glow}, 0 12px 40px rgba(0,0,0,0.5)`,
          overflow: "hidden",
          border: `1px solid rgba(255,255,255,0.1)`,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "82%",
            height: "82%",
            objectFit: "contain",
          }}
        />
      </div>
      {label && (
        <div
          style={{
            opacity: interpolate(p, [0.5, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            color: theme.colors.textDim,
            fontSize: 18,
            fontFamily: theme.fonts.body,
            letterSpacing: 0,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ─── DIVIDER LINE ─────────────────────────────────────────────────────────────
export const DividerLine: React.FC<{ delay?: number; color?: string }> = ({
  delay = 0,
  color = theme.colors.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring.smooth });
  return (
    <div
      style={{
        height: 2,
        width: `${interpolate(p, [0, 1], [0, 100])}%`,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        borderRadius: 2,
        marginTop: 8,
        marginBottom: 8,
      }}
    />
  );
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
export const SectionLabel: React.FC<{
  text: string;
  delay?: number;
  color?: string;
}> = ({ text, delay = 0, color = theme.colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring.snappy });
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-20, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 4,
          height: 20,
          borderRadius: 2,
          background: color,
        }}
      />
      <span
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 16,
          fontWeight: 600,
          color: color,
          letterSpacing: 2,
          textTransform: "uppercase" as const,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Scene 06 — PAYOFF  (f870 → f1005, 29.00s → 33.52s)
// Style: Data Dashboard + Kinetic Typography — ৩৫-৪০ পয়সা counter
// CUE 7b: "মাত্র পঁয়ত্রিশ থেকে চল্লিশ পয়সা মিনিটে"
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
import { BgMesh, Grade, Grain, Vignette, Entrance, ExitWrap } from "../components/Shared";

export const Scene06Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 12;

  // Price counter: 0 → 35 (then 35 → 40 range indicator)
  const counterSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 28, stiffness: 55, mass: 1 },
  });
  const counterVal = interpolate(counterSpring, [0, 1], [0, 35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "থেকে ৪০" second value
  const counter2Spring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 28, stiffness: 50, mass: 1 },
  });
  const counter2Val = interpolate(counter2Spring, [0, 1], [35, 40], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Breathe on big number
  const breathe = 1 + Math.sin(frame / 16) * 0.018;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="pay" />

      {/* SFX */}
      {frame === 3 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.20} />}
      {frame === 12 && <Audio src={staticFile("sfx/hook_thud.wav")} volume={0.20} />}
      {frame === 14 && <Audio src={staticFile("sfx/chime_pluck.wav")} volume={0.28} />}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* Top label */}
          <div style={{ position: "absolute", left: 80, top: 80 }}>
            <Entrance delay={4}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 4, height: 22, background: theme.colors.accentB, borderRadius: 2 }} />
                <span style={{ fontSize: 16, fontWeight: 600, color: theme.colors.accentB, letterSpacing: 3, textTransform: "uppercase" as const }}>
                  অবিশ্বাস্য মূল্য
                </span>
              </div>
            </Entrance>
            <Entrance delay={8}>
              <div style={{ fontSize: 52, fontWeight: 800, color: theme.colors.text, lineHeight: 1.2, letterSpacing: 0 }}>
                মাত্র এই দামে কথা বলুন
              </div>
            </Entrance>
          </div>

          {/* Giant price counter — center */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
            }}
          >
            {/* Price row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 0,
                transform: `scale(${breathe})`,
              }}
            >
              {/* Big number */}
              <span
                style={{
                  fontSize: 260,
                  fontWeight: 800,
                  color: theme.colors.primary,
                  lineHeight: 0.88,
                  letterSpacing: -4,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 80px ${theme.colors.glow}, 0 0 160px rgba(240,110,110,0.15)`,
                }}
              >
                {Math.round(counterVal)}
              </span>
              <span
                style={{
                  fontSize: 260,
                  fontWeight: 800,
                  color: theme.colors.textDim,
                  lineHeight: 0.88,
                  letterSpacing: -4,
                  opacity: 0.35,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                –{Math.round(counter2Val)}
              </span>
            </div>

            {/* Unit */}
            <Entrance delay={20}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: theme.colors.text,
                  letterSpacing: 0,
                  marginTop: 8,
                  textAlign: "center" as const,
                }}
              >
                পয়সা / মিনিট
              </div>
            </Entrance>

            {/* Subtext */}
            <Entrance delay={30}>
              <div
                style={{
                  fontSize: 22,
                  color: theme.colors.textDim,
                  marginTop: 12,
                  letterSpacing: 0,
                }}
              >
                Brilliant app-এর মাধ্যমে বাংলাদেশে
              </div>
            </Entrance>
          </div>

          {/* Bottom: Brilliant logo + loved ones */}
          <Entrance delay={50}>
            <div
              style={{
                position: "absolute",
                bottom: 72,
                left: 80,
                right: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Img
                  src={staticFile("logos/brilliant-icon.png")}
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: "contain",
                    borderRadius: 14,
                    filter: `drop-shadow(0 0 16px ${theme.colors.glow})`,
                  }}
                />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: theme.colors.text, letterSpacing: 0 }}>
                    Brilliant Connect
                  </div>
                  <div style={{ fontSize: 14, color: theme.colors.textDim, letterSpacing: 0 }}>
                    প্রিয়জনের সঙ্গে সংযুক্ত থাকুন
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2, 3, 4].map((s) => {
                  const sp = spring({ frame: frame - 55 - s * 5, fps, config: theme.spring.bouncy });
                  return (
                    <div
                      key={s}
                      style={{
                        fontSize: 28,
                        opacity: sp,
                        transform: `scale(${interpolate(sp, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) rotate(${interpolate(sp, [0, 1], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)`,
                        color: theme.colors.accent,
                      }}
                    >
                      ★
                    </div>
                  );
                })}
              </div>
            </div>
          </Entrance>
        </AbsoluteFill>
      </ExitWrap>

      <Grade />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

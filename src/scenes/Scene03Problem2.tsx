// Scene 03 — PROBLEM 2 + PIVOT  (f266 → f422, 8.88s → 14.08s)
// Style: Before/After Split — VPN failed (left/red), Solution incoming (right/green)
// CUEs 3+4a: "VPN দিয়েও হচ্ছে না — তাহলে আজকের ভিডিওটি আপনার জন্য"
import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, Entrance, ExitWrap, WordReveal } from "../components/Shared";

export const Scene03Problem2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 12;

  // divider line reveal
  const divP = spring({ frame: frame - 10, fps, config: theme.spring.smooth });

  // solution right side enters after f90 (14.08 is ~9.2s into 5.2s scene → solution keyword hits ~f80)
  const solveP = spring({ frame: frame - 82, fps, config: theme.spring.smooth });

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="warn" />

      {/* SFX */}
      {frame === 2 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.20} />}
      {frame === 84 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.26} />}
      {frame === 86 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.18} />}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* Center divider */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "15%",
              bottom: "15%",
              width: 2,
              background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)`,
              transform: `scaleY(${interpolate(divP, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              transformOrigin: "top center",
            }}
          />

          {/* LEFT: Problem — VPN না হওয়া */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: "50%",
              top: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 80px",
            }}
          >
            <Entrance delay={5}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 4, height: 20, background: theme.colors.danger, borderRadius: 2 }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: theme.colors.danger, letterSpacing: 3, textTransform: "uppercase" as const }}>
                  আগে
                </span>
              </div>
            </Entrance>

            <Entrance delay={10}>
              <div style={{ fontSize: 58, fontWeight: 800, color: theme.colors.text, lineHeight: 1.18, letterSpacing: 0, marginBottom: 20 }}>
                সাধারণ <span style={{ color: theme.colors.danger }}>VPN</span> দিয়েও
              </div>
            </Entrance>
            <Entrance delay={18}>
              <div style={{ fontSize: 58, fontWeight: 800, color: theme.colors.text, lineHeight: 1.18, letterSpacing: 0, marginBottom: 32 }}>
                সমাধান নেই
              </div>
            </Entrance>

            {/* Problem list */}
            {[
              "Calling block থাকে",
              "Server মেলে না",
              "কল drop হয়",
            ].map((txt, i) => {
              const p = spring({ frame: frame - 28 - i * 10, fps, config: theme.spring.snappy });
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    opacity: p,
                    transform: `translateX(${interpolate(p, [0, 1], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "rgba(239,68,68,0.2)",
                      border: `1px solid ${theme.colors.danger}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      color: theme.colors.danger,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </div>
                  <span style={{ fontSize: 20, color: theme.colors.textDim, letterSpacing: 0 }}>
                    {txt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Solution hint */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              right: 0,
              top: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 80px",
              opacity: solveP,
              transform: `translateX(${interpolate(solveP, [0, 1], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 4, height: 20, background: theme.colors.success, borderRadius: 2 }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: theme.colors.success, letterSpacing: 3, textTransform: "uppercase" as const }}>
                সমাধান আসছে
              </span>
            </div>

            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                color: theme.colors.text,
                lineHeight: 1.2,
                letterSpacing: 0,
                marginBottom: 16,
              }}
            >
              আজকের ভিডিওটি
            </div>
            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: 0,
                marginBottom: 32,
              }}
            >
              <span style={{ color: theme.colors.primary }}>আপনার</span>{" "}
              <span style={{ color: theme.colors.text }}>জন্য</span>
            </div>

            {/* Glow CTA box */}
            <div
              style={{
                background: `linear-gradient(135deg, rgba(240,110,110,0.12), rgba(240,110,110,0.04))`,
                border: `1px solid rgba(240,110,110,0.25)`,
                borderRadius: 20,
                padding: "20px 24px",
                boxShadow: `0 0 40px rgba(240,110,110,0.1)`,
              }}
            >
              <div style={{ fontSize: 18, color: theme.colors.textDim, letterSpacing: 0, lineHeight: 1.6 }}>
                সেরা সমাধান নিয়ে এলাম —
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: theme.colors.primary,
                  letterSpacing: 0,
                  marginTop: 4,
                }}
              >
                High Speed বাংলাদেশ Server
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

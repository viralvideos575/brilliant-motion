// Scene 02 — PROBLEM 1  (f135 → f266, 4.52s → 8.88s)
// Style: Glossy UI Mockup — Brilliant app with "blocked" error state
// SFX: soft_whoosh on enter, crisp_click on blocked icons
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
import { BgMesh, Grade, Grain, Vignette, Entrance, ExitWrap } from "../components/Shared";

const SCENE_START = 0; // local frame 0 = global f135

export const Scene02Problem1: React.FC = () => {
  const frame = useCurrentFrame(); // local
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 12;

  // Phone mockup appearance
  const phoneP = spring({ frame: frame - 4, fps, config: theme.spring.smooth });

  // Error items stagger
  const items = [
    { icon: "☎", label: "Incoming Call", blocked: true },
    { icon: "📞", label: "Outgoing Call", blocked: true },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="warn" />

      {/* SFX */}
      {frame === 3 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.22} />}
      {frame === 28 && <Audio src={staticFile("sfx/crisp_click.wav")} volume={0.26} />}
      {frame === 44 && <Audio src={staticFile("sfx/crisp_click.wav")} volume={0.24} />}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* Headline */}
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 120,
              right: 80,
            }}
          >
            <Entrance delay={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div style={{ width: 4, height: 22, background: theme.colors.danger, borderRadius: 2 }} />
                <span style={{ fontSize: 16, fontWeight: 600, color: theme.colors.danger, letterSpacing: 3, textTransform: "uppercase" as const }}>
                  সমস্যা
                </span>
              </div>
            </Entrance>
            <Entrance delay={10}>
              <div style={{ fontSize: 66, fontWeight: 800, color: theme.colors.text, lineHeight: 1.15, letterSpacing: 0, maxWidth: 780 }}>
                <span style={{ color: theme.colors.primary }}>Brilliant app</span> open করলেই
              </div>
            </Entrance>
            <Entrance delay={18}>
              <div style={{ fontSize: 66, fontWeight: 800, color: theme.colors.text, lineHeight: 1.15, letterSpacing: 0 }}>
                Calling বন্ধ?
              </div>
            </Entrance>
          </div>

          {/* Phone UI mockup — centered bottom */}
          <div
            style={{
              position: "absolute",
              right: 80,
              top: "50%",
              transform: `translateY(-44%) scale(${interpolate(phoneP, [0,1],[0.7,1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) translateX(${interpolate(phoneP,[0,1],[80,0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              opacity: phoneP,
            }}
          >
            {/* Phone frame */}
            <div
              style={{
                width: 340,
                background: theme.colors.bgAlt,
                borderRadius: 40,
                border: `2px solid rgba(255,255,255,0.1)`,
                boxShadow: `0 0 80px rgba(239,68,68,0.25), 0 40px 80px rgba(0,0,0,0.6)`,
                overflow: "hidden",
                padding: 0,
              }}
            >
              {/* App header */}
              <div
                style={{
                  background: theme.colors.bgPanel,
                  padding: "20px 24px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: theme.colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  B
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: theme.colors.text, letterSpacing: 0 }}>
                    Brilliant Connect
                  </div>
                  <div style={{ fontSize: 11, color: theme.colors.textDim }}>
                    Calling Services
                  </div>
                </div>
                {/* status dot */}
                <div
                  style={{
                    marginLeft: "auto",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: theme.colors.danger,
                    boxShadow: `0 0 8px ${theme.colors.danger}`,
                  }}
                />
              </div>

              {/* Blocked items */}
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item, idx) => {
                  const ip = spring({ frame: frame - 26 - idx * 16, fps, config: theme.spring.snappy });
                  const xShake = idx === 0
                    ? Math.sin(frame * 0.8) * interpolate(frame, [30, 60], [3, 0], { extrapolateRight: "clamp" })
                    : Math.sin(frame * 0.9) * interpolate(frame, [46, 76], [3, 0], { extrapolateRight: "clamp" });
                  return (
                    <div
                      key={idx}
                      style={{
                        opacity: ip,
                        transform: `translateY(${interpolate(ip, [0,1],[20,0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px) translateX(${xShake}px)`,
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        borderRadius: 14,
                        padding: "14px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: "rgba(239,68,68,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          filter: "grayscale(0.5)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: theme.colors.text, letterSpacing: 0 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 12, color: theme.colors.danger, marginTop: 2 }}>
                          Service blocked
                        </div>
                      </div>
                      {/* X icon */}
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: theme.colors.danger,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.colors.white,
                          fontSize: 14,
                          fontWeight: 800,
                          boxShadow: `0 0 12px rgba(239,68,68,0.5)`,
                        }}
                      >
                        ✕
                      </div>
                    </div>
                  );
                })}

                {/* Error message */}
                <Entrance delay={60}>
                  <div
                    style={{
                      background: "rgba(239,68,68,0.05)",
                      borderRadius: 10,
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border: "1px solid rgba(239,68,68,0.12)",
                    }}
                  >
                    <div style={{ fontSize: 16 }}>⚠️</div>
                    <div style={{ fontSize: 12, color: theme.colors.textDim, letterSpacing: 0, lineHeight: 1.5 }}>
                      বিদেশ থেকে সংযোগ ব্লক করা আছে
                    </div>
                  </div>
                </Entrance>
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

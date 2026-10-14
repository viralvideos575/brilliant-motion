// Scene 05 — FEATURE  (f580 → f870, 19.34s → 29.00s)
// Style: Glass Cards — 3 step process: Configure → Connect → Call
// CUEs 5b+6+7a: configuration → calling চালু হয়
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

export const Scene05Feature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 12;

  const steps = [
    {
      num: "01",
      title: "Configuration নিন",
      desc: "আমাদের OpenVPN config file ডাউনলোড করুন",
      icon: "⚙",
      color: theme.colors.accent,
      delay: 10,
    },
    {
      num: "02",
      title: "OpenVPN Connect",
      desc: "Bangladesh server-এ সংযুক্ত হন",
      icon: "🔐",
      color: theme.colors.accentB,
      delay: 28,
    },
    {
      num: "03",
      title: "Brilliant দিয়ে কল করুন",
      desc: "Incoming ও Outgoing — সব চালু",
      icon: "📱",
      color: theme.colors.primary,
      delay: 46,
    },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="solve" />

      {/* SFX */}
      {frame === 2 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.18} />}
      {frame === 12 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.24} />}
      {frame === 30 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.22} />}
      {frame === 48 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.22} />}
      {frame === 100 && <Audio src={staticFile("sfx/crisp_click.wav")} volume={0.20} />}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* Headline */}
          <div style={{ position: "absolute", left: 80, top: 72, right: 80 }}>
            <Entrance delay={4}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 4, height: 22, background: theme.colors.accentB, borderRadius: 2 }} />
                <span style={{ fontSize: 16, fontWeight: 600, color: theme.colors.accentB, letterSpacing: 3, textTransform: "uppercase" as const }}>
                  কীভাবে কাজ করে
                </span>
              </div>
            </Entrance>
            <Entrance delay={8}>
              <div style={{ fontSize: 62, fontWeight: 800, color: theme.colors.text, lineHeight: 1.15, letterSpacing: 0 }}>
                <span style={{ color: theme.colors.primary }}>বিদেশে</span> বসেই{" "}
                <span style={{ color: theme.colors.accentB }}>Calling</span> চালু করুন
              </div>
            </Entrance>
          </div>

          {/* 3 Glass Cards */}
          <div
            style={{
              position: "absolute",
              left: 80,
              right: 80,
              top: 240,
              display: "flex",
              gap: 36,
              alignItems: "flex-start",
            }}
          >
            {steps.map((step, i) => {
              const p = spring({ frame: frame - step.delay, fps, config: theme.spring.smooth });
              const breathe = 1 + Math.sin((frame + i * 30) / 22) * 0.008;

              // Active highlight: current step glows more
              const isActive = frame > step.delay + 30;

              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    opacity: p,
                    transform: `translateY(${interpolate(p, [0, 1], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px) scale(${interpolate(p, [0, 1], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * breathe})`,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(15,32,53,0.85)",
                      backdropFilter: "blur(24px)",
                      border: `1px solid ${isActive ? step.color + "40" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 28,
                      padding: "36px 32px",
                      boxShadow: isActive
                        ? `0 0 40px ${step.color}22, 0 24px 60px rgba(0,0,0,0.5)`
                        : `0 24px 60px rgba(0,0,0,0.4)`,
                      transition: "none",
                      minHeight: 320,
                      display: "flex",
                      flexDirection: "column" as const,
                    }}
                  >
                    {/* Step number */}
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: step.color,
                        letterSpacing: 3,
                        marginBottom: 20,
                        textTransform: "uppercase" as const,
                      }}
                    >
                      STEP {step.num}
                    </div>

                    {/* Icon circle */}
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 20,
                        background: `linear-gradient(135deg, ${step.color}22, ${step.color}0a)`,
                        border: `1px solid ${step.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                        marginBottom: 24,
                        boxShadow: isActive ? `0 0 24px ${step.color}30` : "none",
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        fontSize: 26,
                        fontWeight: 800,
                        color: theme.colors.text,
                        lineHeight: 1.25,
                        letterSpacing: 0,
                        marginBottom: 12,
                      }}
                    >
                      {step.title}
                    </div>

                    {/* Desc */}
                    <div
                      style={{
                        fontSize: 17,
                        color: theme.colors.textDim,
                        lineHeight: 1.6,
                        letterSpacing: 0,
                        flex: 1,
                      }}
                    >
                      {step.desc}
                    </div>

                    {/* Bottom accent bar */}
                    <div
                      style={{
                        marginTop: 24,
                        height: 3,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${step.color}, transparent)`,
                        width: isActive ? "100%" : "40%",
                        transition: "none",
                        opacity: isActive ? 1 : 0.4,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom: Logo bar */}
          <div
            style={{
              position: "absolute",
              bottom: 70,
              left: 80,
              right: 80,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Entrance delay={65}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Img
                  src={staticFile("logos/brilliant-icon.png")}
                  style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 10 }}
                />
                <span style={{ fontSize: 18, fontWeight: 600, color: theme.colors.textDim, letterSpacing: 0 }}>
                  Brilliant
                </span>
                <span style={{ fontSize: 18, color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>+</span>
                <Img
                  src={staticFile("logos/openvpn-small.png")}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
                <span style={{ fontSize: 18, fontWeight: 600, color: theme.colors.textDim, letterSpacing: 0 }}>
                  OpenVPN
                </span>
                <span style={{ fontSize: 18, color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>=</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: theme.colors.success, letterSpacing: 0 }}>
                  কল সফল ✓
                </span>
              </div>
            </Entrance>
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

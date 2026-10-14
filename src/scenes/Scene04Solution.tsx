// Scene 04 — SOLUTION  (f422 → f580, 14.08s → 19.34s)
// Style: Hub & Spoke — Bangladesh server + OpenVPN at center, features around
// CUE 4b+5a: "সেরা সমাধান... high speed বাংলাদেশ server যুক্ত OpenVPN"
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
import {
  BgMesh,
  Grade,
  Grain,
  Vignette,
  Entrance,
  ExitWrap,
} from "../components/Shared";

export const Scene04Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 12;

  // Hub logo pulse
  const hubP = spring({ frame: frame - 8, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 18) * 0.016;

  const spokes = [
    { label: "High Speed", sub: "বাংলাদেশ Server", angle: -60, delay: 22 },
    { label: "OpenVPN", sub: "Secure Tunnel", angle: 0, delay: 30 },
    { label: "Calling", sub: "In + Out চালু", angle: 60, delay: 38 },
  ];

  const HUB_X = 960;
  const HUB_Y = 540;
  const SPOKE_R = 320;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="solve" />

      {/* SFX */}
      {frame === 3 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.20} />}
      {frame === 10 && <Audio src={staticFile("sfx/chime_pluck.wav")} volume={0.28} />}
      {frame === 22 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.22} />}
      {frame === 30 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.20} />}
      {frame === 38 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.20} />}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* Headline top */}
          <div style={{ position: "absolute", left: 80, top: 72, right: 80 }}>
            <Entrance delay={4}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 4, height: 22, background: theme.colors.accent, borderRadius: 2 }} />
                <span style={{ fontSize: 16, fontWeight: 600, color: theme.colors.accent, letterSpacing: 3, textTransform: "uppercase" as const }}>
                  সেরা সমাধান
                </span>
              </div>
            </Entrance>
            <Entrance delay={8}>
              <div style={{ fontSize: 64, fontWeight: 800, color: theme.colors.text, lineHeight: 1.15, letterSpacing: 0 }}>
                <span style={{ color: theme.colors.accent }}>OpenVPN</span> + বাংলাদেশ Server
              </div>
            </Entrance>
          </div>

          {/* SVG Hub & Spoke diagram */}
          <svg
            width={1920}
            height={1080}
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          >
            {spokes.map((spoke, i) => {
              const angleRad = (spoke.angle * Math.PI) / 180;
              const tx = HUB_X + Math.sin(angleRad) * SPOKE_R;
              const ty = HUB_Y + Math.cos(angleRad) * (SPOKE_R * 0.5);
              const sp = spring({ frame: frame - spoke.delay, fps, config: theme.spring.smooth });
              const lineLen = interpolate(sp, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <g key={i}>
                  <line
                    x1={HUB_X}
                    y1={HUB_Y}
                    x2={HUB_X + (tx - HUB_X) * lineLen}
                    y2={HUB_Y + (ty - HUB_Y) * lineLen}
                    stroke={theme.colors.accentB}
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    opacity={0.45}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hub — OpenVPN logo */}
          <div
            style={{
              position: "absolute",
              left: HUB_X - 70,
              top: HUB_Y - 70,
              width: 140,
              height: 140,
              borderRadius: 40,
              background: theme.colors.bgPanel,
              border: `2px solid rgba(245,158,11,0.35)`,
              boxShadow: `0 0 60px ${theme.colors.glowOrange}, 0 0 120px rgba(245,158,11,0.15)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hubP,
              transform: `scale(${interpolate(hubP, [0, 1], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * breathe})`,
              overflow: "hidden",
            }}
          >
            <Img
              src={staticFile("logos/openvpn-small.png")}
              style={{ width: "78%", height: "78%", objectFit: "contain" }}
            />
          </div>

          {/* Spoke cards */}
          {spokes.map((spoke, i) => {
            const angleRad = (spoke.angle * Math.PI) / 180;
            const cx = HUB_X + Math.sin(angleRad) * SPOKE_R;
            const cy = HUB_Y + Math.cos(angleRad) * (SPOKE_R * 0.5);
            const sp = spring({ frame: frame - spoke.delay, fps, config: theme.spring.snappy });

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: cx - 140,
                  top: cy - 52,
                  width: 280,
                  opacity: sp,
                  transform: `scale(${interpolate(sp, [0, 1], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}) translateY(${interpolate(sp, [0, 1], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                }}
              >
                <div
                  style={{
                    background: "rgba(15,32,53,0.9)",
                    border: `1px solid rgba(34,211,238,0.2)`,
                    borderRadius: 18,
                    padding: "14px 20px",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    textAlign: "center" as const,
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: spoke.label === "OpenVPN" ? theme.colors.accent : theme.colors.text,
                      letterSpacing: 0,
                    }}
                  >
                    {spoke.label}
                  </div>
                  <div style={{ fontSize: 15, color: theme.colors.textDim, marginTop: 3, letterSpacing: 0 }}>
                    {spoke.sub}
                  </div>
                </div>
              </div>
            );
          })}

          {/* BD flag color strip — bottom accent */}
          <Entrance delay={50}>
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 80,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 32,
                  borderRadius: 6,
                  background: "#006A4E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#F42A41",
                  }}
                />
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text, letterSpacing: 0 }}>
                বাংলাদেশ Server সরাসরি সংযুক্ত
              </span>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: theme.colors.success,
                  boxShadow: `0 0 10px ${theme.colors.success}`,
                  animation: "none",
                }}
              />
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

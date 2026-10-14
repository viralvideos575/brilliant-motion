// Scene 01 — HOOK  (f0 → f135, 0s → 4.52s)
// Style: Kinetic Typography + Brilliant Connect logo reveal
// SFX: hook_thud at f5, chime_pluck at f25
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

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Exit at frame 123 (12 frames before scene end 135)
  const EXIT = 123;

  // big question mark / globe icon — drawn with CSS
  const globePulse = spring({ frame: frame - 5, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 20) * 0.018;

  // Brilliant-connect logo entrance
  const logoP = spring({ frame: frame - 25, fps, config: theme.spring.bouncy });

  // Line 1 words: "আপনি কি বিদেশ থেকে"
  const line1Words = ["আপনি", "কি", "বিদেশ", "থেকে"];
  // Line 2 highlight: "Brilliant" 
  // Line 3: "ব্যবহার করে বাংলাদেশে কথা বলতে চান?"

  // floating signal rings
  const ring1 = interpolate(frame, [0, 120], [0, 1], {
    easing: theme.ease.inOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="hero" />

      {/* SFX */}
      {frame === 4 && <Audio src={staticFile("sfx/hook_thud.wav")} volume={0.22} />}
      {frame === 24 && <Audio src={staticFile("sfx/chime_pluck.wav")} volume={0.28} />}
      {frame === 55 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.20} />}

      {/* Animated signal rings (background decor) */}
      {[0, 1, 2].map((r) => {
        const delay = r * 20;
        const rp = interpolate(frame - delay, [0, 90], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const rScale = interpolate(rp, [0, 1], [0.4, 2.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rOp = interpolate(rp, [0, 0.5, 1], [0, 0.15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={r}
            style={{
              position: "absolute",
              right: 180,
              top: "50%",
              width: 300,
              height: 300,
              marginTop: -150,
              borderRadius: "50%",
              border: `2px solid ${theme.colors.accentB}`,
              opacity: rOp,
              transform: `scale(${rScale})`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      <ExitWrap exitAt={EXIT} dur={12}>
        <AbsoluteFill>
          {/* LEFT: text block */}
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 0,
              bottom: 0,
              width: 1100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 0,
            }}
          >
            {/* Label */}
            <Entrance delay={2}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 22,
                    background: theme.colors.accentB,
                    borderRadius: 2,
                  }}
                />
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: theme.colors.accentB,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  বিদেশ থেকে কল করুন
                </span>
              </div>
            </Entrance>

            {/* Line 1 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", marginBottom: 4 }}>
              {line1Words.map((word, i) => {
                const p = spring({ frame: frame - 8 - i * 4, fps, config: theme.spring.snappy });
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      opacity: p,
                      transform: `translateY(${interpolate(p, [0, 1], [35, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                      fontSize: 80,
                      fontWeight: 800,
                      color: theme.colors.text,
                      lineHeight: 1.1,
                      letterSpacing: 0,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Brilliant — hero color */}
            {(() => {
              const p = spring({ frame: frame - 26, fps, config: theme.spring.snappy });
              return (
                <div style={{ marginBottom: 4, lineHeight: 1.1, overflow: "hidden" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 18,
                      opacity: p,
                      transform: `translateY(${interpolate(p, [0, 1], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 100,
                        fontWeight: 800,
                        color: theme.colors.primary,
                        textShadow: `0 0 60px ${theme.colors.glow}`,
                        letterSpacing: 0,
                      }}
                    >
                      Brilliant
                    </span>
                    <span
                      style={{
                        fontSize: 80,
                        fontWeight: 800,
                        color: theme.colors.text,
                        letterSpacing: 0,
                      }}
                    >
                      ব্যবহার করে
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Line 3 */}
            {(() => {
              const words = ["বাংলাদেশে", "কথা", "বলতে", "চান?"];
              return (
                <div style={{ display: "flex", gap: "0.32em", flexWrap: "wrap" }}>
                  {words.map((w, i) => {
                    const p = spring({ frame: frame - 38 - i * 4, fps, config: theme.spring.snappy });
                    return (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          opacity: p,
                          transform: `translateY(${interpolate(p, [0, 1], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                          fontSize: 72,
                          fontWeight: 800,
                          color: i === words.length - 1 ? theme.colors.accentB : theme.colors.text,
                          lineHeight: 1.15,
                          letterSpacing: 0,
                        }}
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* RIGHT: Brilliant Connect logo */}
          <div
            style={{
              position: "absolute",
              right: 100,
              top: "50%",
              transform: `translateY(-50%) scale(${interpolate(logoP, [0, 1], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * breathe}) rotate(${interpolate(logoP, [0, 1], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)`,
              opacity: logoP,
            }}
          >
            <Img
              src={staticFile("logos/brilliant-connect.png")}
              style={{
                width: 240,
                height: 240,
                objectFit: "contain",
                filter: `drop-shadow(0 0 40px ${theme.colors.glow})`,
                borderRadius: 36,
              }}
            />
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

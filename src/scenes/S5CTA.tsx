// S5CTA — 26.22s→28.38s — f787→f852 — dur 65
// Style: Violet outro — calm glow, CTA word
// "follow করে রাখুন"
import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, WordReveal, LabelBar } from "../components/Shared";

export const S5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathe = 1 + Math.sin(frame / 18) * 0.020;

  // Ping rings
  const rings = [0, 1, 2];

  // Mark entrance
  const markP = spring({ frame: frame - 5, fps, config: theme.spring.bouncy });

  // CTA button glow pulse
  const btnGlow = 0.3 + Math.abs(Math.sin(frame / 20)) * 0.4;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh heroColor="#8B5CF6" accentColor="#22D3EE" />

      {frame === 3 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.20} />}
      {frame === 8 && <Audio src={staticFile("sfx/chime.wav")} volume={0.28} />}
      {frame === 30 && <Audio src={staticFile("sfx/pop.wav")} volume={0.22} />}

      <AbsoluteFill>
        <div style={{
          position:"absolute", inset:0, display:"flex",
          flexDirection:"column", justifyContent:"center",
          alignItems:"center", padding:"0 60px",
          textAlign:"center",
        }}>
          {/* Ping mark */}
          <div style={{
            position:"relative", marginBottom:48,
            opacity: markP,
            transform:`scale(${interpolate(markP,[0,1],[0.4,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}) * breathe})`,
          }}>
            {/* Ping rings */}
            {rings.map((r) => {
              const rFrame = (frame + r * 20) % 60;
              const rp = rFrame / 60;
              return (
                <div key={r} style={{
                  position:"absolute",
                  inset:-(rp * 50),
                  borderRadius:"50%",
                  border:"1.5px solid rgba(139,92,246,0.4)",
                  opacity: 1 - rp,
                }}/>
              );
            })}
            {/* Center icon */}
            <div style={{
              width:110, height:110, borderRadius:"50%",
              background:"linear-gradient(135deg,rgba(139,92,246,0.22),rgba(34,211,238,0.12))",
              border:"1.5px solid rgba(139,92,246,0.40)",
              boxShadow:`0 0 60px rgba(139,92,246,0.30)`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {/* Phone CSS icon */}
              <div style={{
                width:44, height:72, borderRadius:8,
                border:"3px solid rgba(139,92,246,0.9)",
                position:"relative",
              }}>
                <div style={{
                  position:"absolute", width:12, height:4, borderRadius:2,
                  background:"rgba(139,92,246,0.9)", top:6, left:"50%",
                  transform:"translateX(-50%)",
                }}/>
                <div style={{
                  position:"absolute", width:8, height:8, borderRadius:"50%",
                  background:"rgba(139,92,246,0.9)", bottom:6, left:"50%",
                  transform:"translateX(-50%)",
                }}/>
              </div>
            </div>
          </div>

          <LabelBar text="আরও জানতে" delay={10} color={theme.colors.textDim} />

          {/* Follow */}
          <div style={{ marginBottom:12 }}>
            <WordReveal
              text="আমাদের Page"
              delay={14}
              per={6}
              style={{
                fontSize:100,
                fontWeight:900,
                color:theme.colors.text,
                lineHeight:1.1,
                letterSpacing:0,
                justifyContent:"center",
              }}
            />
          </div>
          <div style={{ marginBottom:40 }}>
            <WordReveal
              text="Follow করুন"
              delay={24}
              per={6}
              highlightWords={["Follow"]}
              highlightColor={theme.colors.primary}
              style={{
                fontSize:100,
                fontWeight:900,
                color:theme.colors.text,
                lineHeight:1.1,
                letterSpacing:0,
                justifyContent:"center",
              }}
            />
          </div>

          {/* CTA button */}
          {(() => {
            const bp = spring({ frame: frame - 38, fps, config: theme.spring.smooth });
            return (
              <div style={{
                background:"linear-gradient(135deg,rgba(139,92,246,0.20),rgba(139,92,246,0.08))",
                border:"1.5px solid rgba(139,92,246,0.40)",
                borderRadius:100, padding:"20px 64px",
                opacity:bp,
                transform:`scale(${interpolate(bp,[0,1],[0.9,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}) * breathe})`,
                boxShadow:`0 0 ${40 + btnGlow*30}px rgba(139,92,246,${0.20 + btnGlow*0.15})`,
              }}>
                <span style={{
                  fontFamily:theme.fonts.body,
                  fontSize:36, fontWeight:900,
                  color:theme.colors.primary,
                  letterSpacing:0,
                  textShadow:`0 0 30px ${theme.colors.glow}`,
                }}>Page Follow করে রাখুন</span>
              </div>
            );
          })()}
        </div>
      </AbsoluteFill>

      <Grade heroColor="#8B5CF6" />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

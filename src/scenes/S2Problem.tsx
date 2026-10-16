// S2Problem — 4.26s→9.16s — f128→f275 — dur 147
// Style: Before/After split — red danger
// "আগে After Effects + শক্তিশালী কম্পিউটার লাগত"
import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, WordReveal, LabelBar, GlassCard, ExitWrap } from "../components/Shared";

export const S2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 10;

  const breathe = 1 + Math.sin(frame / 20) * 0.014;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh heroColor="#EF4444" accentColor="#F06E6E" bgColor="#0C0808" />

      {frame === 2 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.20} />}
      {frame === 28 && <Audio src={staticFile("sfx/pop.wav")} volume={0.22} />}
      {frame === 55 && <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />}

      <ExitWrap exitAt={EXIT} dur={10}>
        <AbsoluteFill>
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", justifyContent:"center",
            padding:"0 60px",
          }}>
            <LabelBar text="আগে যা লাগত" delay={5} color={theme.colors.danger} />

            {/* Two tool cards staggered */}
            <div style={{ display:"flex", gap:24, marginBottom:40 }}>
              {[
                { icon:"Ae", label:"After Effects", sub:"Professional software", delay:15 },
                { icon:"PC", label:"Heavy Computer", sub:"শক্তিশালী কম্পিউটার", delay:22 },
              ].map(({ icon, label, sub, delay }, i) => (
                <GlassCard
                  key={i}
                  delay={delay}
                  glowColor="#EF4444"
                  style={{
                    flex:1, padding:"32px 28px",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:16,
                    border:"1px solid rgba(239,68,68,0.20)",
                  }}
                >
                  {/* Icon box — CSS drawn, no emoji */}
                  <div style={{
                    width:80, height:80, borderRadius:20,
                    background:"linear-gradient(135deg,rgba(239,68,68,0.15),rgba(239,68,68,0.05))",
                    border:"1px solid rgba(239,68,68,0.25)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    transform:`scale(${breathe})`,
                  }}>
                    <span style={{
                      fontFamily:"monospace", fontSize:26, fontWeight:900,
                      color:theme.colors.danger, letterSpacing:-1,
                    }}>{icon}</span>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:26, fontWeight:800, color:theme.colors.text, letterSpacing:0 }}>{label}</div>
                    <div style={{ fontSize:18, color:theme.colors.textDim, marginTop:6, letterSpacing:0 }}>{sub}</div>
                  </div>
                  {/* X mark */}
                  {(() => {
                    const xp = spring({ frame: frame - delay - 20, fps, config: theme.spring.bouncy });
                    return (
                      <div style={{
                        width:44, height:44, borderRadius:"50%",
                        background:"rgba(239,68,68,0.18)",
                        border:`1.5px solid ${theme.colors.danger}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        opacity: xp,
                        transform:`scale(${interpolate(xp,[0,1],[0.4,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})})`,
                        boxShadow:`0 0 16px rgba(239,68,68,0.35)`,
                      }}>
                        <div style={{
                          width:20, height:2.5, background:theme.colors.danger,
                          borderRadius:2, transform:"rotate(45deg)",
                          position:"absolute",
                        }}/>
                        <div style={{
                          width:20, height:2.5, background:theme.colors.danger,
                          borderRadius:2, transform:"rotate(-45deg)",
                          position:"absolute",
                        }}/>
                      </div>
                    );
                  })()}
                </GlassCard>
              ))}
            </div>

            {/* Main text */}
            <div style={{ marginBottom:24 }}>
              <WordReveal
                text="অনেক কঠিন ছিল!"
                delay={50}
                per={5}
                highlightWords={["কঠিন"]}
                highlightColor={theme.colors.danger}
                style={{
                  fontSize:88,
                  fontWeight:900,
                  color:theme.colors.text,
                  letterSpacing:0,
                  lineHeight:1.1,
                }}
              />
            </div>

            {/* Sub text */}
            {(() => {
              const sp = spring({ frame: frame - 80, fps, config: theme.spring.smooth });
              return (
                <div style={{
                  background:"rgba(239,68,68,0.08)",
                  border:"1px solid rgba(239,68,68,0.18)",
                  borderRadius:16, padding:"18px 28px",
                  opacity:sp,
                  transform:`translateY(${interpolate(sp,[0,1],[20,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
                }}>
                  <span style={{
                    fontFamily:theme.fonts.body,
                    fontSize:24, fontWeight:700,
                    color:"rgba(252,165,165,0.9)",
                    letterSpacing:0,
                  }}>সবার পক্ষে সম্ভব ছিল না</span>
                </div>
              );
            })()}
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade heroColor="#EF4444" />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

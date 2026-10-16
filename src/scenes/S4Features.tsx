// S4Features — 16s→26.22s — f480→f787 — dur 307
// Style: Glass Cards — logo/text/motion animation
// "logo animation, text animation, motion graphics নিজে তৈরি করুন"
import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, WordReveal, LabelBar, GlassCard, ExitWrap } from "../components/Shared";

export const S4Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 10;

  const cards = [
    {
      title:"Logo Animation",
      sub:"Brand identity তৈরি করুন",
      color:"#F59E0B",
      glow:"rgba(245,158,11,0.35)",
      delay:18,
      barW:85,
      // CSS icon: star shape via clip-path
      iconBg:"linear-gradient(135deg,rgba(245,158,11,0.20),rgba(245,158,11,0.08))",
      iconBorder:"rgba(245,158,11,0.30)",
      iconContent: <div style={{
        width:32, height:32,
        background:"#F59E0B",
        clipPath:"polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
      }}/>,
    },
    {
      title:"Text Animation",
      sub:"Kinetic typography",
      color:"#8B5CF6",
      glow:"rgba(139,92,246,0.35)",
      delay:40,
      barW:78,
      iconBg:"linear-gradient(135deg,rgba(139,92,246,0.20),rgba(139,92,246,0.08))",
      iconBorder:"rgba(139,92,246,0.30)",
      iconContent: (
        <div style={{ display:"flex", flexDirection:"column", gap:5, width:36 }}>
          <div style={{ height:5, background:"#8B5CF6", borderRadius:3 }}/>
          <div style={{ height:5, background:"#8B5CF6", borderRadius:3, width:"70%" }}/>
          <div style={{ height:5, background:"rgba(139,92,246,0.4)", borderRadius:3, width:"85%" }}/>
        </div>
      ),
    },
    {
      title:"Motion Graphics",
      sub:"Full professional video",
      color:"#22D3EE",
      glow:"rgba(34,211,238,0.30)",
      delay:62,
      barW:92,
      iconBg:"linear-gradient(135deg,rgba(34,211,238,0.15),rgba(34,211,238,0.06))",
      iconBorder:"rgba(34,211,238,0.25)",
      iconContent: (
        <div style={{
          width:0, height:0,
          borderTop:"16px solid transparent",
          borderBottom:"16px solid transparent",
          borderLeft:"30px solid #22D3EE",
          marginLeft:4,
        }}/>
      ),
    },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh heroColor="#F59E0B" accentColor="#8B5CF6" bgColor="#0A0818" />

      {frame === 3  && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.18} />}
      {frame === 10 && <Audio src={staticFile("sfx/chime.wav")} volume={0.22} />}
      {frame === 20 && <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />}
      {frame === 42 && <Audio src={staticFile("sfx/pop.wav")} volume={0.18} />}
      {frame === 64 && <Audio src={staticFile("sfx/pop.wav")} volume={0.18} />}

      <ExitWrap exitAt={EXIT} dur={10}>
        <AbsoluteFill>
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", justifyContent:"center",
            padding:"0 56px",
          }}>
            <LabelBar text="যা বানাতে পারবেন" delay={5} color={theme.colors.accentB} />

            <div style={{ marginBottom:36 }}>
              <WordReveal
                text="নিজের Brand-এর জন্য"
                delay={12}
                per={5}
                highlightWords={["Brand-এর"]}
                highlightColor={theme.colors.accentB}
                style={{
                  fontSize:80,
                  fontWeight:900,
                  color:theme.colors.text,
                  lineHeight:1.15,
                  letterSpacing:0,
                }}
              />
            </div>

            {/* 3 glass cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {cards.map((card, i) => {
                const breathe = 1 + Math.sin((frame + i*30) / 22) * 0.009;
                const barP = spring({ frame: frame - card.delay - 20, fps, config: { damping:28, stiffness:55, mass:1 } });
                return (
                  <GlassCard
                    key={i}
                    delay={card.delay}
                    glowColor={card.color}
                    style={{
                      padding:"28px 32px",
                      display:"flex", alignItems:"center", gap:28,
                      border:`1px solid ${card.iconBorder}`,
                      transform:`scale(${breathe})`,
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width:72, height:72, borderRadius:20, flexShrink:0,
                      background:card.iconBg,
                      border:`1px solid ${card.iconBorder}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      {card.iconContent}
                    </div>
                    {/* Text + bar */}
                    <div style={{ flex:1 }}>
                      <div style={{
                        fontSize:30, fontWeight:800, color:theme.colors.text,
                        letterSpacing:0, marginBottom:6,
                      }}>{card.title}</div>
                      <div style={{
                        fontSize:20, color:theme.colors.textDim,
                        letterSpacing:0, marginBottom:12,
                      }}>{card.sub}</div>
                      {/* Progress bar */}
                      <div style={{
                        height:4, background:"rgba(255,255,255,0.07)",
                        borderRadius:2, overflow:"hidden",
                      }}>
                        <div style={{
                          height:"100%", borderRadius:2,
                          background:`linear-gradient(90deg,${card.color},${card.color}88)`,
                          width:`${interpolate(barP,[0,1],[0,card.barW],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}%`,
                        }}/>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {/* Bottom badge */}
            {(() => {
              const bp = spring({ frame: frame - 100, fps, config: theme.spring.smooth });
              return (
                <div style={{
                  marginTop:28, display:"flex", justifyContent:"center",
                  opacity:bp,
                  transform:`translateY(${interpolate(bp,[0,1],[16,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
                }}>
                  <div style={{
                    background:"rgba(245,158,11,0.10)",
                    border:"1px solid rgba(245,158,11,0.24)",
                    borderRadius:100, padding:"12px 36px",
                    display:"flex", alignItems:"center", gap:12,
                  }}>
                    {/* Small cloud icon */}
                    <div style={{ position:"relative", width:24, height:18 }}>
                      <div style={{ position:"absolute", width:24, height:12, borderRadius:6, background:theme.colors.accentB, bottom:0 }}/>
                      <div style={{ position:"absolute", width:14, height:14, borderRadius:"50%", background:theme.colors.accentB, left:3, top:0 }}/>
                    </div>
                    <span style={{
                      fontFamily:theme.fonts.body,
                      fontSize:22, fontWeight:700,
                      color:"rgba(245,158,11,0.9)",
                      letterSpacing:0,
                    }}>Cloud · সহজ · যেকোনো ডিভাইস</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade heroColor="#F59E0B" />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

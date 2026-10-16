// S1Hook — 0s→4.26s — f0→f127 — dur 128
// Style: Kinetic Typography + Spark logo mark
// Color: Violet hero
import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, WordReveal, LabelBar, ExitWrap } from "../components/Shared";

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 10;

  // Spark rays — 12 CSS rays
  const rays = 12;
  const sparkP = spring({ frame: frame - 5, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 22) * 0.016;

  // Floating accent dots
  const float1 = Math.sin(frame / 28) * 8;
  const float2 = Math.sin(frame / 34 + 1) * 10;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh heroColor="#8B5CF6" accentColor="#22D3EE" />

      {/* SFX */}
      {frame === 3 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.22} />}
      {frame === 20 && <Audio src={staticFile("sfx/chime.wav")} volume={0.26} />}
      {frame === 60 && <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />}

      <ExitWrap exitAt={EXIT} dur={10}>
        <AbsoluteFill>
          {/* Floating accent circles */}
          <div style={{
            position:"absolute", width:24, height:24, borderRadius:"50%",
            background:theme.colors.accent, top:"14%", right:"18%",
            transform:`translateY(${float1}px)`,
            boxShadow:`0 0 20px ${theme.colors.glowC}`,
            opacity: interpolate(frame,[0,20],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}),
          }}/>
          <div style={{
            position:"absolute", width:16, height:16, borderRadius:"50%",
            background:theme.colors.accentB, bottom:"28%", left:"10%",
            transform:`translateY(${float2}px)`,
            boxShadow:`0 0 16px ${theme.colors.glowO}`,
            opacity: interpolate(frame,[0,25],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}),
          }}/>

          {/* Center layout */}
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", justifyContent:"center",
            padding:"0 60px",
          }}>
            {/* Spark mark */}
            <div style={{
              position:"relative", width:100, height:100,
              marginBottom:40,
              transform:`scale(${interpolate(sparkP,[0,1],[0.3,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}) * breathe})`,
              opacity: sparkP,
            }}>
              {/* Circle bg */}
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                background:`radial-gradient(circle,rgba(139,92,246,0.18),transparent 70%)`,
                border:"1px solid rgba(139,92,246,0.3)",
              }}/>
              {/* Rays */}
              {Array.from({ length: rays }).map((_, i) => {
                const rp = spring({ frame: frame - 5 - i * 1.2, fps, config: theme.spring.snappy });
                return (
                  <div key={i} style={{
                    position:"absolute", left:"50%", top:"50%",
                    width:3, height: 40 * interpolate(rp,[0,1],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}),
                    background:theme.colors.primary,
                    borderRadius:4, transformOrigin:"50% 0%",
                    transform:`translateX(-50%) rotate(${(360/rays)*i}deg) translateY(${6}px)`,
                    opacity: rp,
                  }}/>
                );
              })}
              {/* Center dot */}
              <div style={{
                position:"absolute", top:"50%", left:"50%",
                width:18, height:18, borderRadius:"50%",
                background:theme.colors.primary,
                transform:"translate(-50%,-50%)",
                boxShadow:`0 0 24px ${theme.colors.glow}`,
              }}/>
            </div>

            {/* Label */}
            <LabelBar text="Motion Graphics" delay={10} color={theme.colors.accent} />

            {/* Main headline */}
            <div style={{ marginBottom:20 }}>
              <WordReveal
                text="আপনিও তৈরি করুন"
                delay={15}
                per={5}
                highlightWords={["তৈরি"]}
                highlightColor={theme.colors.primary}
                style={{
                  fontSize:96,
                  fontWeight:900,
                  color:theme.colors.text,
                  lineHeight:1.1,
                  letterSpacing:0,
                }}
              />
            </div>

            {/* Sub headline */}
            <div style={{ marginBottom:32 }}>
              <WordReveal
                text="আকর্ষণীয় Motion Graphics ভিডিও"
                delay={32}
                per={4}
                highlightWords={["Motion", "Graphics"]}
                highlightColor={theme.colors.accent}
                style={{
                  fontSize:58,
                  fontWeight:800,
                  color:theme.colors.textDim,
                  lineHeight:1.2,
                  letterSpacing:0,
                }}
              />
            </div>

            {/* Divider line */}
            {(() => {
              const lp = spring({ frame: frame - 55, fps, config: theme.spring.smooth });
              return (
                <div style={{
                  height:2, borderRadius:2, marginBottom:36,
                  width:`${interpolate(lp,[0,1],[0,70],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}%`,
                  background:`linear-gradient(90deg,${theme.colors.primary},${theme.colors.accent},transparent)`,
                }}/>
              );
            })()}

            {/* Feature chips */}
            <div style={{ display:"flex", gap:16 }}>
              {["Logo ✦", "Text ✦", "Motion"].map((chip, i) => {
                const cp = spring({ frame: frame - 70 - i * 6, fps, config: theme.spring.snappy });
                return (
                  <div key={i} style={{
                    background:"rgba(139,92,246,0.12)",
                    border:"1px solid rgba(139,92,246,0.28)",
                    borderRadius:100,
                    padding:"10px 24px",
                    opacity: cp,
                    transform:`translateY(${interpolate(cp,[0,1],[16,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
                  }}>
                    <span style={{
                      fontFamily:theme.fonts.body,
                      fontSize:22,
                      fontWeight:700,
                      color:theme.colors.primary,
                      letterSpacing:0,
                    }}>{chip}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade heroColor="#8B5CF6" />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

// S3Solution — 9.16s→16s — f275→f480 — dur 205
// Style: Green emerald, cloud reveal, feature list
// "এখন cloud-based tools দিয়ে online করা সম্ভব"
import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BgMesh, Grade, Grain, Vignette, WordReveal, LabelBar, DivLine, ExitWrap } from "../components/Shared";

export const S3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const EXIT = durationInFrames - 10;

  // Cloud icon bounce entrance
  const cloudP = spring({ frame: frame - 8, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 25) * 0.018;
  // Orbiting dot
  const orbit = (frame / fps) * 360 * 0.4; // 0.4 rev/sec

  const features = [
    { text:"Browser-এ সরাসরি কাজ করুন", delay:70 },
    { text:"মোবাইল বা PC — সবখানে", delay:84 },
    { text:"নিজের Brand-এর জন্য তৈরি করুন", delay:98 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh heroColor="#10B981" accentColor="#22D3EE" bgColor="#041510" />

      {frame === 3 && <Audio src={staticFile("sfx/whoosh.wav")} volume={0.20} />}
      {frame === 12 && <Audio src={staticFile("sfx/chime.wav")} volume={0.26} />}
      {frame === 72 && <Audio src={staticFile("sfx/pop.wav")} volume={0.20} />}
      {frame === 86 && <Audio src={staticFile("sfx/pop.wav")} volume={0.18} />}
      {frame === 100 && <Audio src={staticFile("sfx/pop.wav")} volume={0.18} />}

      <ExitWrap exitAt={EXIT} dur={10}>
        <AbsoluteFill>
          <div style={{
            position:"absolute", inset:0, display:"flex",
            flexDirection:"column", justifyContent:"center",
            padding:"0 60px",
          }}>
            <LabelBar text="এখন সমাধান" delay={5} color={theme.colors.success} />

            {/* Cloud mark — CSS only */}
            <div style={{
              position:"relative", width:120, height:120, marginBottom:40,
              opacity: cloudP,
              transform:`scale(${interpolate(cloudP,[0,1],[0.4,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}) * breathe})`,
            }}>
              {/* Outer ring */}
              <div style={{
                position:"absolute", inset:-10, borderRadius:"50%",
                border:"1px solid rgba(16,185,129,0.25)",
              }}/>
              {/* Inner circle */}
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(16,185,129,0.18),rgba(34,211,238,0.10))",
                border:"1px solid rgba(16,185,129,0.35)",
                boxShadow:`0 0 50px rgba(16,185,129,0.22)`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {/* Cloud SVG shape using divs */}
                <div style={{ position:"relative", width:60, height:44 }}>
                  <div style={{
                    position:"absolute", width:60, height:30, borderRadius:15,
                    background:theme.colors.success, bottom:0,
                  }}/>
                  <div style={{
                    position:"absolute", width:32, height:32, borderRadius:"50%",
                    background:theme.colors.success, left:8, top:0,
                  }}/>
                  <div style={{
                    position:"absolute", width:26, height:26, borderRadius:"50%",
                    background:theme.colors.success, right:8, top:6,
                  }}/>
                </div>
              </div>
              {/* Orbiting dot */}
              <div style={{
                position:"absolute", width:12, height:12, borderRadius:"50%",
                background:theme.colors.accent,
                top:"50%", left:"50%",
                transform:`translate(-50%,-50%) rotate(${orbit}deg) translateY(-68px)`,
                boxShadow:`0 0 12px ${theme.colors.glowC}`,
              }}/>
            </div>

            {/* Main headline */}
            <div style={{ marginBottom:16 }}>
              <WordReveal
                text="এখন Cloud-based"
                delay={20}
                per={5}
                highlightWords={["Cloud-based"]}
                highlightColor={theme.colors.success}
                style={{
                  fontSize:88,
                  fontWeight:900,
                  color:theme.colors.text,
                  lineHeight:1.1,
                  letterSpacing:0,
                }}
              />
            </div>
            <div style={{ marginBottom:32 }}>
              <WordReveal
                text="Tools দিয়ে Online-এ সম্ভব!"
                delay={36}
                per={4}
                highlightWords={["Online-এ", "সম্ভব!"]}
                highlightColor={theme.colors.accent}
                style={{
                  fontSize:68,
                  fontWeight:900,
                  color:theme.colors.textDim,
                  lineHeight:1.2,
                  letterSpacing:0,
                }}
              />
            </div>

            <DivLine delay={60} color={theme.colors.success} />

            {/* Feature checklist */}
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {features.map(({ text, delay }, i) => {
                const fp = spring({ frame: frame - delay, fps, config: theme.spring.smooth });
                return (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:20,
                    opacity:fp,
                    transform:`translateX(${interpolate(fp,[0,1],[-24,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`,
                  }}>
                    {/* Check circle — CSS */}
                    <div style={{
                      width:36, height:36, borderRadius:"50%", flexShrink:0,
                      background:"rgba(16,185,129,0.15)",
                      border:`1.5px solid ${theme.colors.success}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      {/* Checkmark */}
                      <div style={{
                        width:14, height:7, borderLeft:`2.5px solid ${theme.colors.success}`,
                        borderBottom:`2.5px solid ${theme.colors.success}`,
                        transform:"rotate(-45deg) translate(1px,-2px)",
                        borderRadius:1,
                      }}/>
                    </div>
                    <span style={{
                      fontFamily:theme.fonts.body,
                      fontSize:26, fontWeight:700,
                      color:theme.colors.textDim,
                      letterSpacing:0,
                    }}>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      </ExitWrap>

      <Grade heroColor="#10B981" />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

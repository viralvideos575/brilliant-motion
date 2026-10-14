// Scene 07 — CTA  (f1005 → f1276, 33.52s → 42.54s)
// Style: Statement Card + Brilliant Connect brand outro
// CUEs 8+9: "বাংলাদেশে কথা বলুন... WhatsApp নম্বরে যোগাযোগ করুন"
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
import { BgMesh, Grade, Grain, Vignette, Entrance, ExitWrap, WordReveal } from "../components/Shared";

export const Scene07CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main card
  const cardP = spring({ frame: frame - 6, fps, config: theme.spring.smooth });
  // WhatsApp CTA
  const ctaP = spring({ frame: frame - 35, fps, config: theme.spring.bouncy });
  const breathe = 1 + Math.sin(frame / 20) * 0.014;
  // Logo breathe
  const logoP = spring({ frame: frame - 18, fps, config: theme.spring.bouncy });

  // Description box link pulse
  const pulse = 0.6 + Math.abs(Math.sin(frame / 25)) * 0.4;

  return (
    <AbsoluteFill style={{ fontFamily: theme.fonts.display }}>
      <BgMesh variant="hero" />

      {/* SFX */}
      {frame === 4 && <Audio src={staticFile("sfx/soft_whoosh.wav")} volume={0.18} />}
      {frame === 18 && <Audio src={staticFile("sfx/chime_pluck.wav")} volume={0.28} />}
      {frame === 36 && <Audio src={staticFile("sfx/crisp_click.wav")} volume={0.28} />}
      {frame === 90 && <Audio src={staticFile("sfx/soft_pop.wav")} volume={0.16} />}

      <ExitWrap exitAt={255} dur={16}>
      {/* Top: Brand logo + name */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 72,
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: logoP,
          transform: `translateY(${interpolate(logoP, [0, 1], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        <Img
          src={staticFile("logos/brilliant-connect.png")}
          style={{
            width: 60,
            height: 60,
            objectFit: "contain",
            borderRadius: 16,
            filter: `drop-shadow(0 0 20px ${theme.colors.glow})`,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: theme.colors.text,
              letterSpacing: 0,
            }}
          >
            Brilliant Connect
          </div>
          <div style={{ fontSize: 14, color: theme.colors.primary, fontWeight: 600, letterSpacing: 0 }}>
            বিদেশ থেকে বাংলাদেশে
          </div>
        </div>
      </div>

      {/* Main headline */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 180,
        }}
      >
        <Entrance delay={10}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: theme.colors.text,
              lineHeight: 1.15,
              letterSpacing: 0,
              marginBottom: 6,
            }}
          >
            আপনার{" "}
            <span
              style={{
                color: theme.colors.primary,
                textShadow: `0 0 50px ${theme.colors.glow}`,
              }}
            >
              প্রিয়জনদের
            </span>
          </div>
        </Entrance>
        <Entrance delay={16}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: theme.colors.text,
              lineHeight: 1.15,
              letterSpacing: 0,
              marginBottom: 32,
            }}
          >
            সঙ্গে কথা বলুন
          </div>
        </Entrance>

        <Entrance delay={22}>
          <div
            style={{
              fontSize: 24,
              color: theme.colors.textDim,
              lineHeight: 1.6,
              letterSpacing: 0,
              maxWidth: 820,
            }}
          >
            বাংলাদেশে সরাসরি কল — মাত্র{" "}
            <span style={{ color: theme.colors.accentB, fontWeight: 700 }}>৩৫–৪০ পয়সা/মিনিট</span>
          </div>
        </Entrance>
      </div>

      {/* WhatsApp CTA Card */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 110,
          right: 80,
          opacity: ctaP,
          transform: `translateY(${interpolate(ctaP, [0, 1], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px) scale(${interpolate(ctaP, [0, 1], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * breathe})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, rgba(37,211,102,0.12), rgba(37,211,102,0.04))`,
            border: `1.5px solid rgba(37,211,102,0.35)`,
            borderRadius: 28,
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            gap: 28,
            boxShadow: `0 0 60px rgba(37,211,102,0.12), 0 24px 60px rgba(0,0,0,0.4)`,
          }}
        >
          {/* WhatsApp icon — drawn with CSS */}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 20,
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              flexShrink: 0,
              boxShadow: `0 0 30px rgba(37,211,102,0.4)`,
            }}
          >
            💬
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: theme.colors.text,
                letterSpacing: 0,
                marginBottom: 8,
              }}
            >
              OpenVPN Setup ও বিস্তারিত জানতে
            </div>
            <div
              style={{
                fontSize: 17,
                color: theme.colors.textDim,
                letterSpacing: 0,
                lineHeight: 1.55,
              }}
            >
              ভিডিওর{" "}
              <span style={{ color: "#25D366", fontWeight: 700 }}>description box</span>-এ দেওয়া
              <br />
              <span style={{ color: "#25D366", fontWeight: 700 }}>WhatsApp নম্বরে</span> যোগাযোগ করুন
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
              opacity: pulse,
              boxShadow: `0 0 20px rgba(37,211,102,0.5)`,
            }}
          >
            →
          </div>
        </div>
      </div>

      {/* Description box indicator */}
      <Entrance delay={60}>
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              background: "rgba(15,32,53,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "20px 24px",
              textAlign: "center" as const,
              width: 220,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontSize: 42, marginBottom: 10 }}>⬇</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: theme.colors.text,
                letterSpacing: 0,
                lineHeight: 1.5,
              }}
            >
              Description Box
            </div>
            <div
              style={{
                fontSize: 13,
                color: theme.colors.textDim,
                marginTop: 6,
                letterSpacing: 0,
              }}
            >
              WhatsApp লিংক নিচে
            </div>
          </div>
        </div>
      </Entrance>

      </ExitWrap>
      <Grade />
      <Vignette />
      <Grain />
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, Audio, Composition, Sequence, staticFile } from "remotion";
import { S1Hook }     from "./scenes/S1Hook";
import { S2Problem }  from "./scenes/S2Problem";
import { S3Solution } from "./scenes/S3Solution";
import { S4Features } from "./scenes/S4Features";
import { S5CTA }      from "./scenes/S5CTA";

// 9:16 Reel format — 1080×1920 @ 30fps
// Total: 28.38s = 852 frames
const FPS = 30;
const W   = 1080;
const H   = 1920;
const TOTAL = 852;

// Scene timings (SRT-derived):
// S1 HOOK     f0→f128    dur=128   (0s→4.26s)
// S2 PROBLEM  f128→f275  dur=147   (4.26s→9.16s)
// S3 SOLUTION f275→f480  dur=205   (9.16s→16.0s)
// S4 FEATURES f480→f787  dur=307   (16.0s→26.22s)
// S5 CTA      f787→f852  dur=65    (26.22s→28.38s)
// Total = 128+147+205+307+65 = 852 ✓

const PREVIEW_VO = false; // set true to hear voiceover in Studio

export const Main: React.FC = () => (
  <AbsoluteFill>
    {PREVIEW_VO && <Audio src={staticFile("voiceover.mp3")} volume={0.85} />}
    <Sequence from={0}   durationInFrames={128}><S1Hook /></Sequence>
    <Sequence from={128} durationInFrames={147}><S2Problem /></Sequence>
    <Sequence from={275} durationInFrames={205}><S3Solution /></Sequence>
    <Sequence from={480} durationInFrames={307}><S4Features /></Sequence>
    <Sequence from={787} durationInFrames={65}><S5CTA /></Sequence>
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={TOTAL}
    fps={FPS}
    width={W}
    height={H}
    defaultProps={{}}
  />
);

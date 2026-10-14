// Root.tsx — Main composition orchestrating all 7 scenes
// Total duration: 42.54s @ 30fps = 1276 frames
// Each scene is a Sequence at exact SRT-derived frame offset

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  staticFile,
} from "remotion";
import { Scene01Hook }     from "./scenes/Scene01Hook";
import { Scene02Problem1 } from "./scenes/Scene02Problem1";
import { Scene03Problem2 } from "./scenes/Scene03Problem2";
import { Scene04Solution } from "./scenes/Scene04Solution";
import { Scene05Feature }  from "./scenes/Scene05Feature";
import { Scene06Payoff }   from "./scenes/Scene06Payoff";
import { Scene07CTA }      from "./scenes/Scene07CTA";

const FPS = 30;
const W   = 1920;
const H   = 1080;
const TOTAL = 1276; // Math.ceil(42.54 * 30)

// Scene timing from SRT (all in frames @ 30fps):
// Scene 01 HOOK      f0   → f135  dur=135
// Scene 02 PROBLEM1  f135 → f266  dur=131
// Scene 03 PROBLEM2  f266 → f422  dur=156
// Scene 04 SOLUTION  f422 → f580  dur=158
// Scene 05 FEATURE   f580 → f870  dur=290
// Scene 06 PAYOFF    f870 → f1005 dur=135
// Scene 07 CTA       f1005 → f1276 dur=271

const scenes = [
  { comp: Scene01Hook,     from: 0,    dur: 135  },
  { comp: Scene02Problem1, from: 135,  dur: 131  },
  { comp: Scene03Problem2, from: 266,  dur: 156  },
  { comp: Scene04Solution, from: 422,  dur: 158  },
  { comp: Scene05Feature,  from: 580,  dur: 290  },
  { comp: Scene06Payoff,   from: 870,  dur: 135  },
  { comp: Scene07CTA,      from: 1005, dur: 271  },
] as const;

// Optional voiceover — add public/voiceover.mp3 to hear it synced
const PREVIEW_AUDIO = false; // set true to hear VO in Studio preview

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Optional voiceover */}
      {PREVIEW_AUDIO && (
        <Audio src={staticFile("voiceover.mp3")} volume={0.85} />
      )}

      {/* Scenes */}
      {scenes.map(({ comp: Comp, from, dur }, i) => (
        <Sequence key={i} from={from} durationInFrames={dur}>
          <Comp />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// Register root composition
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={TOTAL}
        fps={FPS}
        width={W}
        height={H}
        defaultProps={{}}
      />
    </>
  );
};

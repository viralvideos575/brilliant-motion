import { loadFont } from "@remotion/google-fonts/HindSiliguri";

const { waitUntilDone } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["bengali", "latin"],
});

export const fontPromise = waitUntilDone();

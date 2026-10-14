import { loadFont } from "@remotion/google-fonts/HindSiliguri";
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

loadFont("normal", { weights: ["400", "600", "700", "800"], subsets: ["bengali", "latin"] });

registerRoot(RemotionRoot);

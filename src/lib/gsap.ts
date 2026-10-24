"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// se registran una sola vez, del lado del navegador
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, useGSAP);
  // solo en desarrollo, para poder inspeccionar las animaciones desde la consola
  if (process.env.NODE_ENV === "development") Object.assign(window, { gsap, ScrollTrigger });
}

export { DrawSVGPlugin, gsap, MorphSVGPlugin, ScrollTrigger, SplitText, useGSAP };

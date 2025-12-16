"use client";

import { ParallaxProvider } from "react-scroll-parallax";

export default function ParallaxProviders({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}

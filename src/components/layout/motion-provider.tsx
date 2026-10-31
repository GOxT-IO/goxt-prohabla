"use client";

import { MotionConfig } from "motion/react";

/** Desactiva las animaciones de motion cuando el sistema pide reducir el movimiento. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

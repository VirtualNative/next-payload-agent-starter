#!/usr/bin/env node
/**
 * Adds Framer Motion and motion wrappers for shadcn in apps/web.
 */
const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const webDir = path.join(process.cwd(), 'apps', 'web');
if (!fs.existsSync(webDir)) {
  console.error('apps/web not found. Run from repo root.');
  process.exit(1);
}

console.log('Installing framer-motion...');
cp.execSync('pnpm add framer-motion --filter web', { stdio: 'inherit' });

const motionDir = path.join(webDir, 'components', 'motion');
fs.mkdirSync(motionDir, { recursive: true });

fs.writeFileSync(path.join(motionDir, 'MotionProviders.tsx'), `
"use client";
import { LazyMotion, domAnimation, m as motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

export function MotionRoot({ children }: PropsWithChildren) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function PagePresence({ children, routeKey }: PropsWithChildren<{ routeKey: string }>) {
  const prefersReduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
        exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
`.trim());

fs.writeFileSync(path.join(motionDir, 'transitions.ts'), `
export const durations = { fast: 0.12, base: 0.18, slow: 0.28 };
export const variants = {
  fadeInUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: durations.base, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: durations.fast, ease: "easeOut" },
  },
};
`.trim());

fs.writeFileSync(path.join(motionDir, 'MotionCard.tsx'), `
"use client";
import { m as motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { variants } from "./transitions";
import { ComponentProps } from "react";
type Props = ComponentProps<typeof Card> & { variant?: keyof typeof variants };
export function MotionCard({ variant = "fadeInUp", ...props }: Props) {
  const V = variants[variant];
  return (
    <motion.div initial={V.initial} animate={V.animate} exit={V.exit} transition={V.transition}>
      <Card {...props} />
    </motion.div>
  );
}
`.trim());

console.log('Framer Motion integration complete.');

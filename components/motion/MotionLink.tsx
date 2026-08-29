"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// A Next.js <Link> that also accepts Framer Motion props (whileHover, whileTap, etc.)
export const MotionLink = motion(Link);

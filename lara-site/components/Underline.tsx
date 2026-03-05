"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        className="absolute left-0 -bottom-1 h-[1px] w-full bg-black/70"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </span>
  );
}


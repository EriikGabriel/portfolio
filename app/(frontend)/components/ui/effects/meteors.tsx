/** biome-ignore-all lint/suspicious/noArrayIndexKey: fixed items safe to use as keys */
"use client";

import { cn } from "@utils/cn";
import { motion } from "motion/react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        // Deterministic position: evenly distribute across a fixed width so SSR/client match
        const spread = 800;
        const position = Math.round(idx * (spread / meteorCount) - spread / 2);

        // Deterministic timings derived from the index
        const maxDelay = 5;
        const delay = ((idx % 10) / 10) * maxDelay + 0.2;
        const durationBase = 5;
        const duration = durationBase + (idx % 6);

        return (
          <span
            key={`meteor${idx}`}
            className={cn(
              "animate-meteor-effect absolute left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] before:absolute before:top-1/2 before:h-px before:w-12.5 before:translate-y-[-50%] before:transform before:bg-linear-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-5px",
              left: `${position}px`,
              animationDelay: `${delay.toFixed(3)}s`,
              animationDuration: `${duration}s`,
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};

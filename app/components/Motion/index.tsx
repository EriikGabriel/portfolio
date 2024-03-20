"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

const Wrapper = motion.div;

interface MotionProps extends React.ComponentProps<typeof Wrapper> {
  as?: React.ElementType;
}

export const Motion = forwardRef<React.ElementRef<typeof Wrapper>, MotionProps>(
  ({ children, as, ...props }, ref) => {
    const Comp = as ? motion(as) : Wrapper;

    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

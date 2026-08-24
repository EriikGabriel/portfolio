"use client";

import { useLoading } from "@contexts/loading";
import { cn } from "@utils/cn";
import type { ReactNode } from "react";

export function MainContentGate({ children }: { children: ReactNode }) {
  const { isLoading } = useLoading();

  return (
    <div aria-hidden={isLoading} className={cn(isLoading && "invisible")}>
      {children}
    </div>
  );
}

"use client";

import { useLoading } from "@contexts/loading";
import { lenisRef } from "@utils/lenis";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
	const prefersReducedMotion = useReducedMotion();
	const { isLoading } = useLoading();

	useEffect(() => {
		if (prefersReducedMotion) return;

		const lenis = new Lenis({
			autoRaf: true,
			lerp: 0.12,
			wheelMultiplier: 1,
			touchMultiplier: 1.5,
		});

		lenisRef.current = lenis;

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [prefersReducedMotion]);

	useEffect(() => {
		const lenis = lenisRef.current;
		if (!lenis) return;

		if (isLoading) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [isLoading]);

	return <>{children}</>;
}

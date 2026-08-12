"use client";

import { useLoading } from "@contexts/loading";
import type { ReactNode } from "react";

export function MainContentGate({ children }: { children: ReactNode }) {
	const { isLoading } = useLoading();

	if (isLoading) return null;

	return <>{children}</>;
}

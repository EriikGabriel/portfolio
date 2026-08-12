"use client";

import {
	createContext,
	type ReactNode,
	type RefObject,
	useContext,
	useRef,
	useState,
} from "react";

interface LoadingContextValue {
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	headerLogoRef: RefObject<SVGSVGElement | null>;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const headerLogoRef = useRef<SVGSVGElement>(null);

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading, headerLogoRef }}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const ctx = useContext(LoadingContext);
	if (!ctx) throw new Error("useLoading must be used within <LoadingProvider>");
	return ctx;
}

"use client";

import {
	createContext,
	type ReactNode,
	type TransitionStartFunction,
	useContext,
	useTransition,
} from "react";

interface ProjectsTransitionValue {
	isPending: boolean;
	startTransition: TransitionStartFunction;
}

const ProjectsTransitionContext = createContext<ProjectsTransitionValue | null>(
	null,
);

export function ProjectsTransitionProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [isPending, startTransition] = useTransition();

	return (
		<ProjectsTransitionContext.Provider value={{ isPending, startTransition }}>
			{children}
		</ProjectsTransitionContext.Provider>
	);
}

export function useProjectsTransition() {
	const ctx = useContext(ProjectsTransitionContext);
	if (!ctx) {
		throw new Error(
			"useProjectsTransition should be used within ProjectsTransitionProvider",
		);
	}
	return ctx;
}

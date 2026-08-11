"use client";

import { cn } from "@utils/cn";
import { motion, useInView } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type EncryptedTextProps = {
	text: string;
	className?: string;
	/**
	 * Time in milliseconds between revealing each subsequent real character.
	 * Lower is faster. Defaults to 50ms per character.
	 */
	revealDelayMs?: number;
	/** Optional custom character set to use for the gibberish effect. */
	charset?: string;
	/**
	 * Time in milliseconds between gibberish flips for unrevealed characters.
	 * Lower is more jittery. Defaults to 50ms.
	 */
	flipDelayMs?: number;
	/** CSS class for styling the encrypted/scrambled characters */
	encryptedClassName?: string;
	/** CSS class for styling the revealed characters */
	revealedClassName?: string;
};

const DEFAULT_CHARSET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
	const index = Math.floor(Math.random() * charset.length);
	return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
	original: string,
	charset: string,
): string {
	if (!original) return "";

	let result = "";

	for (let i = 0; i < original.length; i += 1) {
		const ch = original[i];
		result += ch === " " ? " " : generateRandomCharacter(charset);
	}

	return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
	text,
	className,
	revealDelayMs = 50,
	charset = DEFAULT_CHARSET,
	flipDelayMs = 50,
	encryptedClassName,
	revealedClassName,
}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true });

	const [revealCount, setRevealCount] = useState(0);

	// IMPORTANT:
	// Keep the initial value deterministic so server and client render
	// exactly the same HTML during hydration.
	const [scrambleChars, setScrambleChars] = useState<string[]>(() =>
		text ? text.split("").map((char) => (char === " " ? " " : "?")) : [],
	);

	const animationFrameRef = useRef<number | null>(null);
	const startTimeRef = useRef<number>(0);
	const lastFlipTimeRef = useRef<number>(0);

	useEffect(() => {
		if (!isInView || !text) return;

		let isCancelled = false;

		const initial = generateGibberishPreservingSpaces(text, charset);

		// Randomness starts AFTER hydration.
		setScrambleChars(initial.split(""));

		startTimeRef.current = performance.now();
		lastFlipTimeRef.current = startTimeRef.current;
		setRevealCount(0);

		const update = (now: number) => {
			if (isCancelled) return;

			const elapsedMs = now - startTimeRef.current;
			const totalLength = text.length;

			const currentRevealCount = Math.min(
				totalLength,
				Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
			);

			setRevealCount(currentRevealCount);

			if (currentRevealCount >= totalLength) {
				return;
			}

			const timeSinceLastFlip = now - lastFlipTimeRef.current;

			if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
				setScrambleChars((previous) => {
					const next = [...previous];

					for (let index = 0; index < totalLength; index += 1) {
						if (index >= currentRevealCount) {
							next[index] =
								text[index] === " " ? " " : generateRandomCharacter(charset);
						}
					}

					return next;
				});

				lastFlipTimeRef.current = now;
			}

			animationFrameRef.current = requestAnimationFrame(update);
		};

		animationFrameRef.current = requestAnimationFrame(update);

		return () => {
			isCancelled = true;

			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isInView, text, revealDelayMs, charset, flipDelayMs]);

	if (!text) return null;

	return (
		<motion.span ref={ref} className={cn(className)} aria-label={text}>
			{text.split("").map((char, index) => {
				const isRevealed = index < revealCount;

				const displayChar = isRevealed
					? char
					: char === " "
						? " "
						: (scrambleChars[index] ?? "?");

				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: Character positions are stable for this text animation.
						key={index}
						className={cn(isRevealed ? revealedClassName : encryptedClassName)}
					>
						{displayChar}
					</span>
				);
			})}
		</motion.span>
	);
};

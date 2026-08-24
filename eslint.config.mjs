import jsxA11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import babelParser from "@babel/eslint-parser";

// Replicates `next/core-web-vitals` in flat config without eslint-config-next,
// which pulls in typescript-eslint — still incompatible with TypeScript 7
// (this project runs TS 7.0.2). Syntax parsing is handled by Babel instead.
// eslint-plugin-react is omitted: latest release does not support ESLint 10.
// Revisit once typescript-eslint supports TS 7+.
const FILES = ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"];
const GENERATED = [
	".next/**",
	"node_modules/**",
	"next-env.d.ts",
	"app/(payload)/payload-types.ts",
	"app/(payload)/admin/importMap.js",
];

export default [
	{
		ignores: GENERATED,
	},
	{
		files: FILES,
		languageOptions: {
			parser: babelParser,
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					plugins: [
						"@babel/plugin-syntax-typescript",
						"@babel/plugin-syntax-jsx",
					],
				},
			},
		},
	},
	{
		files: FILES,
		plugins: { "@next/next": nextPlugin },
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs["core-web-vitals"].rules,
		},
	},
	{
		files: FILES,
		...reactHooks.configs.flat.recommended,
		rules: {
			...reactHooks.configs.flat.recommended.rules,
			// Decorative animation widgets intentionally use render-time randomness
			// and effect-based initialization (hydration-safe). Revisit if these
			// components get refactored.
			"react-hooks/purity": "warn",
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/refs": "warn",
		},
	},
	{
		files: FILES,
		plugins: { "jsx-a11y": jsxA11y },
		rules: {
			...jsxA11y.configs.recommended.rules,
		},
	},
];

import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const projectsSearchParams = {
	page: parseAsString.withDefault("1"),
	search: parseAsString.withDefault(""),
	filter: parseAsString,
};

export const projectsSearchParamsCache =
	createSearchParamsCache(projectsSearchParams);

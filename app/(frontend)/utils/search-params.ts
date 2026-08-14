import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const projectsSearchParams = {
	search: parseAsString,
	filter: parseAsString,
};

export const projectsSearchParamsCache =
	createSearchParamsCache(projectsSearchParams);

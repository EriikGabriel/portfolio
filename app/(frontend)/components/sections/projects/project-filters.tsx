import type { Project } from "@payload/payload-types";
import type { DropdownBlurItem } from "@ui/effects/dropdown-blur";
import type { Populated } from "@utils/payload";

export const OTHER_FILTER_VALUE = "other";

export interface TagLookup {
	/** value do dropdown -> id da tag no banco */
	idByFilterValue: Map<string, string | number>;
	/** ids de todas as tags "conhecidas" (todas exceto "Outros") */
	knownIds: Set<string | number>;
}

/**
 * Cruza os dropdownItems com os documentos reais de Tags (por título),
 * retornando os IDs prontos para uso em filtros — sem depender de
 * comparação de string em runtime a cada request.
 */
export function buildTagLookup(
	dropdownItems: DropdownBlurItem[],
	tagDocs: { id: string | number; title: string }[],
): TagLookup {
	const idByTitle = new Map(tagDocs.map((tag) => [tag.title, tag.id]));
	const idByFilterValue = new Map<string, string | number>();

	for (const item of dropdownItems) {
		if (item.value === OTHER_FILTER_VALUE) continue;

		const id = idByTitle.get(item.name);
		if (id === undefined) {
			// Tag esperada pelo dropdown não existe (ou o título não bate
			// exatamente) no banco — melhor avisar no log do que filtrar
			// errado silenciosamente.
			console.warn(
				`[project-filters] Nenhuma tag encontrada com título "${item.name}" (filtro "${item.value}")`,
			);
			continue;
		}

		idByFilterValue.set(item.value ?? "", id);
	}

	return {
		idByFilterValue,
		knownIds: new Set(idByFilterValue.values()),
	};
}

function hasTag(project: Populated<Project>, id: string | number): boolean {
	return Boolean(
		project.tags?.some((tag) => typeof tag === "object" && tag.id === id),
	);
}

function hasAnyKnownTag(
	project: Populated<Project>,
	knownIds: Set<string | number>,
): boolean {
	return Boolean(
		project.tags?.some(
			(tag) => typeof tag === "object" && knownIds.has(tag.id),
		),
	);
}

/**
 * Filtra os projetos por tag. Se o filtro não corresponder a nenhuma
 * tag conhecida, retorna lista vazia em vez de "tudo" — evita mostrar
 * resultados errados quando há um mismatch de dado.
 */
export function filterProjectsByTag(
	docs: Populated<Project>[],
	filter: string | null,
	lookup: TagLookup,
): Populated<Project>[] {
	if (!filter) {
		return docs;
	}

	if (filter === OTHER_FILTER_VALUE) {
		return docs.filter((project) => !hasAnyKnownTag(project, lookup.knownIds));
	}

	const tagId = lookup.idByFilterValue.get(filter);

	if (tagId === undefined) {
		return [];
	}

	return docs.filter((project) => hasTag(project, tagId));
}

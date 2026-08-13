import configPromise from "@payload-config";
import {
	type CollectionSlug,
	type DataFromCollectionSlug,
	type DataFromGlobalSlug,
	type GlobalSlug,
	getPayload,
} from "payload";

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

let payloadPromise: ReturnType<typeof getPayload> | undefined;

export function getPayloadInstance() {
	payloadPromise ??= getPayload({
		config: configPromise,
	});

	return payloadPromise;
}

type PopulateField<T> = T extends null | undefined
	? T
	: T extends readonly (infer U)[]
		? Array<PopulateField<U>>
		: T extends string | number
			? never
			: T;

export type Populated<T> = T extends object
	? {
			[K in keyof T]: PopulateField<T[K]>;
		}
	: T;

type IsPopulatedDepth<T> = T extends number
	? T extends 0
		? false
		: true
	: false;

export type WithDepth<T, TDepth> =
	IsPopulatedDepth<TDepth> extends true ? Populated<T> : T;

export async function findPopulated<
	TSlug extends CollectionSlug,
	TDepth extends number | undefined = undefined,
>(
	args: Parameters<PayloadInstance["find"]>[0] & {
		collection: TSlug;
		depth?: TDepth;
	},
): Promise<
	Omit<Awaited<ReturnType<PayloadInstance["find"]>>, "docs"> & {
		docs: WithDepth<DataFromCollectionSlug<TSlug>, TDepth>[];
	}
> {
	const payload = await getPayloadInstance();
	const result = await payload.find(args);

	return result as unknown as Omit<typeof result, "docs"> & {
		docs: WithDepth<DataFromCollectionSlug<TSlug>, TDepth>[];
	};
}

export async function findPopulatedGlobal<
	TSlug extends GlobalSlug,
	TDepth extends number | undefined = undefined,
>(
	args: Parameters<PayloadInstance["findGlobal"]>[0] & {
		slug: TSlug;
		depth?: TDepth;
	},
): Promise<WithDepth<DataFromGlobalSlug<TSlug>, TDepth>> {
	const payload = await getPayloadInstance();
	const result = await payload.findGlobal(args);

	return result as unknown as WithDepth<DataFromGlobalSlug<TSlug>, TDepth>;
}

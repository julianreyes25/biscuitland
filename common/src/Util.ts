// deno-lint-ignore-file no-explicit-any
import { ObjectToLower, ObjectToSnake } from './Types.ts';
// use deno std instead of biscuitland colors
export * from 'https://deno.land/std@0.209.0/fmt/colors.ts'

export function isObject(o: any) {
	return o && typeof o === 'object' && !Array.isArray(o);
}

export function Options<T>(defaults: any, ...options: any[]): T {
	const option = options.shift();
	if (!option) return defaults;

	return Options(
		{
			...option,
			...Object.fromEntries(
				Object.entries(defaults).map(([key, value]) => [
					key,
					isObject(value)
						? Options(value, option?.[key] || {})
						: option?.[key] || value,
				]),
			),
		},
		...options,
	);
}
/**
 * Convert a camelCase object to snake_case.
 * @param target The object to convert.
 * @returns The converted object.
 */
export function toSnakeCase<Obj extends Record<string, any>>(
	target: Obj,
): ObjectToSnake<Obj> {
	const result: { [k: string]: unknown } = {};
	for (const [key, value] of Object.entries(target)) {
		switch (typeof value) {
			case 'string':
			case 'bigint':
			case 'boolean':
			case 'function':
			case 'number':
			case 'symbol':
			case 'undefined':
				result[ReplaceRegex.snake(key)] = value;
				break;
			case 'object':
				if (Array.isArray(value)) {
					result[ReplaceRegex.snake(key)] = value.map((
						prop,
					) => (typeof prop === 'object' && prop ? toSnakeCase(prop) : prop));
					break;
				}
				if (isObject(value)) {
					result[ReplaceRegex.snake(key)] = toSnakeCase({ ...value });
					break;
				}
				if (!Number.isNaN(value)) {
					result[ReplaceRegex.snake(key)] = null;
					break;
				}
				result[ReplaceRegex.snake(key)] = toSnakeCase({ ...value });
				break;
		}
	}
	return result as ObjectToSnake<Obj>;
}

/**
 * Convert a snake_case object to camelCase.
 * @param target The object to convert.
 * @returns The converted object.
 */
export function toCamelCase<Obj extends Record<string, any>>(
	target: Obj,
): ObjectToLower<Obj> {
	const result: { [k: string]: unknown } = {};
	for (const [key, value] of Object.entries(target)) {
		switch (typeof value) {
			case 'string':
			case 'bigint':
			case 'boolean':
			case 'function':
			case 'symbol':
			case 'number':
			case 'undefined':
				result[ReplaceRegex.camel(key)] = value;
				break;
			case 'object':
				if (Array.isArray(value)) {
					result[ReplaceRegex.camel(key)] = value.map((
						prop,
					) => (typeof prop === 'object' && prop ? toCamelCase(prop) : prop));
					break;
				}
				if (isObject(value)) {
					result[ReplaceRegex.camel(key)] = toCamelCase({ ...value });
					break;
				}
				if (!Number.isNaN(value)) {
					result[ReplaceRegex.camel(key)] = null;
					break;
				}
				result[ReplaceRegex.camel(key)] = toCamelCase({ ...value });
				break;
		}
	}
	return result as ObjectToLower<Obj>;
}

export const ReplaceRegex = {
	camel: (s: string) => {
		return s.replace(/(_\S)/gi, (a) => a[1].toUpperCase());
	},
	snake: (s: string) => {
		return s.replace(/[A-Z]/g, (a) => `_${a.toLowerCase()}`);
	},
};

export function delay<T>(time: number, result?: T): Promise<T> {
	// An alternative to Node.js async setTimeout
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(result);
		}, time);
	}) as any;
}
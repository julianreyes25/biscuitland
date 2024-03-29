// deno-lint-ignore-file no-explicit-any
import { CDN_URL } from '../../common/mod.ts';
import type { CDNRoutes, Routes } from '../mod.ts';
import { BiscuitREST } from './REST.ts';

export enum RequestMethod {
	Delete = 'delete',
	Get = 'get',
	Patch = 'patch',
	Post = 'post',
	Put = 'put',
}

const ArrRequestsMethods = Object.values(RequestMethod) as string[];

export class Router {
	noop = () => {
		return;
	};

	constructor(private rest: BiscuitREST) {}

	createProxy(route = [] as string[]): Routes {
		return new Proxy(this.noop, {
			get: (_, key: string) => {
				if (ArrRequestsMethods.includes(key)) {
					return (...options: any[]) =>
						(this.rest as any)[key](`/${route.join('/')}`, ...options);
				}
				return this.createProxy([...route, key]);
			},
			apply: (...[, _, args]) => {
				return this.createProxy([...route, ...args.filter((x) => x != null)]);
			},
		}) as unknown as Routes;
	}
}

export class CDN {
	static createProxy(route = [] as string[]): CDNRoutes {
		const noop = () => {
			return;
		};
		return new Proxy(noop, {
			get: (_, key: string) => {
				if (key === 'get') {
					return (value?: string) => {
						const lastRoute = `${CDN_URL}/${route.join('/')}`;
						if (value) {
							if (typeof value !== 'string') {
								// rome-ignore lint/nursery/noParameterAssign: fix multiples value types
								value = String(value);
							}
							return `${lastRoute}/${value}`;
						}
						return lastRoute;
					};
				}
				return this.createProxy([...route, key]);
			},
			apply: (...[, _, args]) => {
				return this.createProxy([...route, ...args.filter((x) => x != null)]);
			},
		}) as unknown as CDNRoutes;
	}
}

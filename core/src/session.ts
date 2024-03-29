// deno-lint-ignore-file adjacent-overload-signatures no-explicit-any
import { GatewayIntentBits, Identify, When } from '../../common/mod.ts';
import type { BiscuitRESTOptions, CDNRoutes, Routes } from '../../rest/mod.ts';
import { BiscuitREST, CDN, Router } from '../../rest/mod.ts';
import {
	GatewayEvents,
	ShardManager,
	ShardManagerOptions,
} from '../../ws/mod.ts';
import EventEmitter2 from 'https://esm.sh/eventemitter2@6.4.9';
import { getBotIdFromToken, MainManager } from '../mod.ts';
import { actionHandler, Handler } from './events/handler.ts';

export class Session<On extends boolean = boolean> extends EventEmitter2 {
	constructor(public options: BiscuitOptions) {
		super();
		this.rest = this.createRest(this.options.rest);
		this.api = new Router(this.rest).createProxy();
		this.cdn = CDN.createProxy();
		this.managers = new MainManager(this);
	}
	rest: BiscuitREST;
	api: Routes;
	cdn: CDNRoutes;
	managers: MainManager;
	gateway!: When<On, ShardManager>;
	private _applicationId?: string;
	private _botId?: string;

	override on<K extends keyof GatewayEvents>(
		event: `${K}`,
		func: Handler[K],
	): this;
	override on<K extends string>(
		event: `${K}`,
		func: (...args: unknown[]) => unknown,
	): this {
		const ev = super.on(event, func);

		// @ts-expect-error Eventemitter can sometimes return a listener
		return ev.emitter ? ev.emitter : ev;
	}
	override off<K extends keyof GatewayEvents>(
		event: `${K}`,
		func: Handler[K],
	): this;
	override off<K extends keyof GatewayEvents>(
		event: `${K}`,
		func: (...args: unknown[]) => unknown,
	): this {
		return super.off(event, func);
	}

	override once<K extends keyof GatewayEvents>(
		event: `${K}`,
		func: Handler[K],
	): this;
	override once<K extends string>(
		event: `${K}`,
		func: (...args: unknown[]) => unknown,
	): this {
		const ev = super.on(event, func);

		// @ts-expect-error Eventemitter can sometimes return a listener
		return ev.emitter ? ev.emitter : ev;
	}

	override emit<K extends keyof GatewayEvents>(
		event: `${K}`,
		...params: Parameters<Handler[K]>
	): boolean;
	override emit<K extends string>(
		event: `${K}`,
		...params: unknown[]
	): boolean {
		return super.emit(event, ...params);
	}

	set botId(id: string) {
		this._botId = id;
	}

	set applicationId(id: string) {
		this._applicationId = id;
	}

	get botId() {
		return this._botId ?? getBotIdFromToken(this.options.token);
	}

	get applicationId() {
		return this._applicationId ?? this.botId;
	}

	private createRest(rest: any) {
		if (!rest) {
			return new BiscuitREST({
				token: this.options.token,
				...this.options.defaultRestOptions,
			});
		}

		if (rest instanceof BiscuitREST || rest.cRest) {
			return rest;
		}

		throw new Error('[CORE] REST not found');
	}

	async start() {
		// alias fixed `this` on handlePayload
		const ctx = this as Session<true>;

		ctx.gateway = new ShardManager({
			token: this.options.token,
			intents: this.options.intents ?? 0,
			info: this.options.defaultGatewayOptions?.info ??
				(await this.api.gateway.bot.get()),
			handlePayload(shard: any, data: any) {
				const { t, d } = data;
				if (!(t && d)) return;
				actionHandler([ctx, { t, d }, shard]);
			},
			...this.options.defaultGatewayOptions,
		});

		ctx.once('READY', (payload) => {
			const { user, application } = payload as any;
			this.botId = user.id;
			this.applicationId = application.id;
		});

		await ctx.gateway.spawnShards();
	}

	async stop() {
		this.removeAllListeners();
		await this.gateway.disconnectAll();
	}
}

export type HandlePayload = Pick<
	ShardManagerOptions,
	'handlePayload'
>['handlePayload'];

export interface BiscuitOptions {
	token: string;
	intents: number | GatewayIntentBits;
	rest?: BiscuitREST;
	defaultRestOptions?: Partial<BiscuitRESTOptions>;
	defaultGatewayOptions?: Identify<
		Partial<Omit<ShardManagerOptions, 'token' | 'intents'>>
	>;
}

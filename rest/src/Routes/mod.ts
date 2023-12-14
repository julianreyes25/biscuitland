import { ApplicationRoutes } from './applications.ts';
import { ChannelRoutes } from './channels.ts';
import { GatewayRoutes } from './gateway.ts';
import { GuildRoutes } from './guilds.ts';
import { InteractionRoutes } from './interactions.ts';
import { InviteRoutes } from './invites.ts';
import { StageInstanceRoutes } from './stage-instances.ts';
import { StickerRoutes } from './stickers.ts';
import { UserRoutes } from './users.ts';
import { VoiceRoutes } from './voice.ts';
import { WebhookRoutes } from './webhooks.ts';

export type Routes =
	& ApplicationRoutes
	& ChannelRoutes
	& GatewayRoutes
	& GuildRoutes
	& InteractionRoutes
	& InviteRoutes
	& StageInstanceRoutes
	& StickerRoutes
	& UserRoutes
	& VoiceRoutes
	& WebhookRoutes;

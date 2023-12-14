import {
	RESTGetAPIStickerResult,
	RESTGetNitroStickerPacksResult,
} from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface StickerRoutes {
	stickers(id: string): {
		get(
			args?: RestArguments<RequestMethod.Get>,
		): Promise<RESTGetAPIStickerResult>;
	};
	'sticker-packs': {
		get(
			args?: RestArguments<RequestMethod.Get>,
		): Promise<RESTGetNitroStickerPacksResult>;
	};
}

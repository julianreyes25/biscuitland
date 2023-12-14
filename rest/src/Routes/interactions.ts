import { RESTPostAPIInteractionCallbackJSONBody } from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface InteractionRoutes {
	interactions: {
		(id: string): {
			(token: string): {
				callback: {
					post(
						args: RestArguments<
							RequestMethod.Post,
							RESTPostAPIInteractionCallbackJSONBody
						>,
					): Promise<never>;
				};
			};
		};
	};
}

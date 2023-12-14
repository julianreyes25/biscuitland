import { RESTGetAPIVoiceRegionsResult } from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface VoiceRoutes {
	voice: {
		region: {
			get(
				args?: RestArguments<RequestMethod.Get>,
			): Promise<RESTGetAPIVoiceRegionsResult>;
		};
	};
}

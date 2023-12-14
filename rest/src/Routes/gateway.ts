import {
	RESTGetAPIGatewayBotResult,
	RESTGetAPIGatewayResult,
} from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface GatewayRoutes {
	gateway: {
		get(
			args?: RestArguments<RequestMethod.Get>,
		): Promise<RESTGetAPIGatewayResult>;
		bot: {
			get(
				args?: RestArguments<RequestMethod.Get>,
			): Promise<RESTGetAPIGatewayBotResult>;
		};
	};
}

import {
	RESTDeleteAPIStageInstanceResult,
	RESTGetAPIStageInstanceResult,
	RESTPatchAPIStageInstanceJSONBody,
	RESTPatchAPIStageInstanceResult,
	RESTPostAPIStageInstanceJSONBody,
	RESTPostAPIStageInstanceResult,
} from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface StageInstanceRoutes {
	'stage-instances': {
		post(
			args: RestArguments<RequestMethod.Post, RESTPostAPIStageInstanceJSONBody>,
		): Promise<RESTPostAPIStageInstanceResult>;
		(id: string): {
			get(
				args?: RestArguments<RequestMethod.Get>,
			): Promise<RESTGetAPIStageInstanceResult>;
			patch(
				args: RestArguments<
					RequestMethod.Patch,
					RESTPatchAPIStageInstanceJSONBody
				>,
			): Promise<RESTPatchAPIStageInstanceResult>;
			delete(
				args?: RestArguments<RequestMethod.Delete>,
			): Promise<RESTDeleteAPIStageInstanceResult>;
		};
	};
}

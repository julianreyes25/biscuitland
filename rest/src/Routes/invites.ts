import {
	RESTDeleteAPIInviteResult,
	RESTGetAPIInviteQuery,
	RESTGetAPIInviteResult,
} from '../../../common/mod.ts';
import { RestArguments } from '../REST.ts';
import { RequestMethod } from '../Router.ts';

export interface InviteRoutes {
	invites(id: string): {
		get(
			args?: RestArguments<RequestMethod.Get, RESTGetAPIInviteQuery>,
		): Promise<RESTGetAPIInviteResult>;
		delete(
			args?: RestArguments<RequestMethod.Delete>,
		): Promise<RESTDeleteAPIInviteResult>;
	};
}

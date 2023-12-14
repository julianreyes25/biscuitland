import type { Session } from '../session.ts';
import { ApplicationManager } from './ApplicationManager.ts';
import { ChannelManager } from './ChannelManager.ts';
import { GuildManager } from './GuildManager.ts';
import { InteractionManager } from './InteractionManager.ts';
import { MemberManager } from './MemberManager.ts';
import { UserManager } from './UserManager.ts';
import { WebhookManager } from './WebhookManager.ts';

export class MainManager {
	constructor(private readonly session: Session) {
		this.users = new UserManager(this.session);
		this.guilds = new GuildManager(this.session);
		this.members = new MemberManager(this.session);
		this.channels = new ChannelManager(this.session);
		this.applications = new ApplicationManager(this.session);
		this.interactions = new InteractionManager(this.session);
		this.webhooks = new WebhookManager(this.session);
	}

	users: UserManager;
	guilds: GuildManager;
	members: MemberManager;
	channels: ChannelManager;
	applications: ApplicationManager;
	interactions: InteractionManager;
	webhooks: WebhookManager;
}

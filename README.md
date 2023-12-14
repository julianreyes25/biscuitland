# BiscuitLand

A brand new bleeding edge non bloated Discord library.\
Unofficial port from https://github.com/oasisjs/biscuit for Deno developers

# Features

- Remarkably minimal memory footprint
- Utilities out of the box
- Microservice based
- Optional cache

# Example

```ts
import {
	GatewayIntentBits,
	InteractionResponseType,
	InteractionType,
} from 'https://deno.land/x/biscuitland@3.0.4/common/mod.ts';
import { Session } from 'https://deno.land/x/biscuitland@3.0.4/core/mod.ts';

const session = new Session({
	intents: GatewayIntentBits.Guilds,
	token: 'your token goes here',
});

const commands = [
	{
		name: 'ping',
		description: 'Replies with pong!',
	},
];

session.once('READY', (payload) => {
	const username = payload.user.username;
	console.log('Logged in as: %s', username);
	session.managers.applications.bulkCommands(session.applicationId, commands);
});

session.on('INTERACTION_CREATE', (interaction) => {
	if (interaction.type !== InteractionType.ApplicationCommand) return;
	session.managers.interactions.reply(interaction.id, interaction.token, {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: { content: 'pong!' },
	});
});

session.start();
```

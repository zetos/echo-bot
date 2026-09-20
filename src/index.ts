import dotenvSafe from 'dotenv-safe';
import {
  Client,
  Collection,
  GatewayIntentBits,
  type InteractionReplyOptions,
  MessageFlags,
  Partials,
} from 'discord.js';
import { commandList } from './commands';

dotenvSafe.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Message, Partials.Reaction],
});

client.once('clientReady', (readyClient) => {
  console.info(`Logged as ${readyClient.user.tag}!`);
});

const cmds = new Collection(commandList.map((cmd) => [cmd.data.name, cmd]));

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  const command = cmds.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const errorReply = {
      content: 'There was an error while executing this command!',
      flags: MessageFlags.Ephemeral,
    } satisfies InteractionReplyOptions;

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorReply);
    } else {
      await interaction.reply(errorReply);
    }
  }
});

client.login(process.env['DISCORD_TOKEN']).catch((error) => {
  console.error('Failed to log in to Discord.', error);
  process.exitCode = 1;
});

import dotenvSafe from 'dotenv-safe';
import { Client, Collection, Intents, Interaction } from 'discord.js';
import { commandList } from './commands';

dotenvSafe.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION'],
});

client.once('ready', () => {
  console.info(`Logged as ${client.user!.tag}!`);
});

const cmds = new Collection();

for (const command of commandList) {
  cmds.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const command = cmds.get(interaction.commandName) as {
    execute(inter: Interaction): Promise<void>;
  };

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

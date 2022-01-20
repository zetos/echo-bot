import dotenvSafe from 'dotenv-safe';
import { Client, Intents } from 'discord.js';

dotenvSafe.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION'],
});

client.once('ready', () => {
  console.info(`Logged as ${client.user!.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  if (interaction.commandName === 'ping') {
    interaction.reply({
      content: 'ping..',
      ephemeral: false,
    });
  } else if (interaction.commandName === 'beep') {
    interaction.reply({
      content: 'beep..',
      ephemeral: true,
    });
  } else if (interaction.commandName === 'echo') {
    const words = interaction.options.getString('words')!;
    const wordsArr = words.split(' ');

    interaction.reply({
      content: `${wordsArr[wordsArr.length - 1]}..`,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

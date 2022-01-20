import dotenvSafe from 'dotenv-safe';
import { Client, Constants, Intents } from 'discord.js';

dotenvSafe.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION'],
});

client.once('ready', () => {
  console.info(`Logged as ${client.user!.tag}!`);
  const guildId = process.env.GUILD_ID!; // Remove it to register globally.
  const guild = client.guilds.cache.get(guildId);
  const commands = guild ? guild.commands : client.application?.commands;

  commands?.create({
    name: 'ping',
    description: 'Replies with ping..',
  });

  commands?.create({
    name: 'echo',
    description: 'Repeats the last word.',
    options: [
      {
        name: 'words',
        description: 'A simple phrase.',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;

  if (commandName === 'ping') {
    interaction.reply({
      content: 'ping..',
      ephemeral: true,
    });
  } else if (commandName === 'echo') {
    const words = options.getString('words')!;
    const wordsArr = words.split(' ');

    interaction.reply({
      content: `${wordsArr[wordsArr.length - 1]}..`,
    });
  }
});

const cmdPrefix = '!';
client.on('messageCreate', (msg) => {
  if (msg.content.startsWith(cmdPrefix)) {
    const [cmd, ...args] = msg.content
      .trim()
      .substring(cmdPrefix.length)
      .split(/\s+/);

    if (cmd === 'echo') {
      const echoRes = `${args[args.length - 1]}..`;
      msg.reply({ content: echoRes });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

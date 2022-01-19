import dotenvSafe from 'dotenv-safe';
import { Client, Intents } from 'discord.js';

dotenvSafe.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'REACTION'],
});
const cmdPrefix = '!';

client.once('ready', () => {
  console.info(`Logged as ${client.user!.tag}!`);
});

client.on('messageCreate', (msg) => {
  if (msg.content.startsWith(cmdPrefix)) {
    const [cmd, ...args] = msg.content
      .trim()
      .substring(cmdPrefix.length)
      .split(/\s+/);

    // msg.reply(`The command: '${cmd}' was received.`);

    if (cmd === 'echo') {
      const echoRes = args.join(' ');
      msg.reply({ content: echoRes });
    }
  }
});

client.on('messageReactionAdd', (reaction, _user) => {
  const { name } = reaction.emoji;
  //const member = reaction.message.guild?.members.cache.get(user.id);
  console.log('message id:', reaction.message.id);

  if (reaction.message.id === '864950154129440808') {
    switch (name) {
      case '🍎':
        reaction.message.reply('Apple test.');
        break;
      case '👹':
        break;
      case '👺':
        break;
      case '👾':
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

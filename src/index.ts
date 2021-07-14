import dotenvSafe from 'dotenv-safe';
import Discord from 'discord.js';
dotenvSafe.config();

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION'],
});
const cmdPrefix = '!';

client.on('ready', () => {
  console.info(`Logged as ${client.user!.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content.startsWith(cmdPrefix)) {
    const [cmd, ...args] = msg.content
      .trim()
      .substring(cmdPrefix.length)
      .split(/\s+/);
    // msg.reply(`The command: '${cmd}' was received.`);

    if (cmd === 'echo') {
      const a = args.join(' ');
      msg.reply(a);
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
        //member?.roles.add('role_id');
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

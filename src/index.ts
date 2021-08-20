import dotenvSafe from 'dotenv-safe';
import Discord from 'discord.js';
import { fromEvent, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

dotenvSafe.config();

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION'],
});
const cmdPrefix = '!';

// client.on('ready', () => {
//   console.info(`Logged as ${client.user!.tag}!`);
// });

const readyEvent = fromEvent(client, 'ready');
const messageEvent = fromEvent(client, 'message');

readyEvent.subscribe(() => console.info(`Logged as ${client.user!.tag}!`));

const test = messageEvent.pipe(
  map((msg) => {
    const discordMsg = msg as Discord.Message;
    if (discordMsg.content.startsWith(cmdPrefix)) {
      const [cmd, ...args] = discordMsg.content
        .trim()
        .substring(cmdPrefix.length)
        .split(/\s+/);
      // discordMsg.reply(`The command: '${cmd}' was received.`);

      if (cmd === 'echo') {
        const a = args.join(' ');
        discordMsg.reply(a);
      }
    }
    return 'Done..';
  })
);

const subscribe = test.subscribe();

// client.on('message', (msg) => {
//   if (msg.content.startsWith(cmdPrefix)) {
//     const [cmd, ...args] = msg.content
//       .trim()
//       .substring(cmdPrefix.length)
//       .split(/\s+/);
//     // msg.reply(`The command: '${cmd}' was received.`);

//     if (cmd === 'echo') {
//       const a = args.join(' ');
//       msg.reply(a);
//     }
//   }
// });

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

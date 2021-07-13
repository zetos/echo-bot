import dotenvSafe from 'dotenv-safe';
import Discord from 'discord.js';
dotenvSafe.config();

const client = new Discord.Client();
const cmdPrefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content.startsWith(cmdPrefix)) {
    const [cmd, ...args] = msg.content
      .trim()
      .substring(cmdPrefix.length)
      .split(/\s+/);
    // msg.reply(`The command: '${cmd}' was received.`);

    if (cmd === 'echo') {
      const a = `${args}`.replace(/,/g, ' ');
      console.log('test:', a);
      msg.reply(a);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

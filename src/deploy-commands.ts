import { commandList } from './commands';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

const commands = commandList.map((cmd) => cmd.data.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!,
    ),
    {
      body: commands,
    },
  )
  .then(() => console.info('Successfully registered application commands.'))
  .catch(console.error);

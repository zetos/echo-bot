import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping..'),
  new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with beep..'),
  new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Repeats the last word.')
    .addStringOption((option) =>
      option.setName('phrase').setDescription('A phrase..').setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!
    ),
    {
      body: commands,
    }
  )
  .then(() => console.info('Successfully registered application commands.'))
  .catch(console.error);

import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping..'),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isCommand()) {
      return;
    }
    await interaction.reply('ping..');
  },
};

export { ping };

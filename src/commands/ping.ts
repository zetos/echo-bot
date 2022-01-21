import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping..'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }
    await interaction.reply('ping..');
  },
};

export { ping };

import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';

const beep = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with beep..'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }
    await interaction.reply('beep..');
  },
};

export { beep };

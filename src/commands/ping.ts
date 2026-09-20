import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping..'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('ping..');
  },
};

export { ping };

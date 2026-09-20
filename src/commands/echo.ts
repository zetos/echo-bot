import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const echo = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Repeats the last word.')
    .addStringOption((option) =>
      option.setName('phrase').setDescription('A phrase..').setRequired(true),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const words = interaction.options.getString('phrase', true);
    const wordsArr = words.split(' ');

    await interaction.reply({
      content: `${wordsArr[wordsArr.length - 1]}..`,
    });
  },
};

export { echo };

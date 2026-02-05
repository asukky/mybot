const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('meditate').setDescription('Meditate for gains.'),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });
    return interaction.reply(ctx.game.meditate(player));
  }
};

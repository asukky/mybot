const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('name').setDescription('Set your profile name.').addStringOption((o) => o.setName('value').setDescription('name').setRequired(true)),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });
    return interaction.reply(ctx.game.renamePlayer(player, interaction.options.getString('value', true)));
  }
};

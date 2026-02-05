const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('kill').setDescription('Fight another player.').addUserOption((o) => o.setName('target').setDescription('target').setRequired(true)),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });
    const target = interaction.options.getUser('target', true);
    return interaction.reply(ctx.game.pvp(player, ctx.game.getPlayer(target.id)));
  }
};

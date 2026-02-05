const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('route')
    .setDescription('Set route')
    .addStringOption((o) => o.setName('path').setDescription('route').setRequired(true).addChoices({ name: 'righteous', value: 'righteous' }, { name: 'demonic', value: 'demonic' })),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });
    return interaction.reply(ctx.game.setRoute(player, interaction.options.getString('path', true)));
  }
};

const { SlashCommandBuilder } = require('discord.js');
const { buildProfileAttachment } = require('../services/rendering/ProfileCardService');

module.exports = {
  data: new SlashCommandBuilder().setName('profile').setDescription('Render advanced profile card.'),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });
    const fields = ctx.game.getStatusFields(player);
    const card = buildProfileAttachment(fields, player);
    return interaction.reply({ content: `Cultivation dossier for **${player.name}**`, files: [card] });
  }
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('start').setDescription('Create randomized cultivation profile.'),
  async execute(interaction, ctx) {
    if (ctx.game.hasProfile(interaction.user.id)) return interaction.reply({ content: 'Profile already exists. Use /profile.', ephemeral: true });
    const player = ctx.game.createPlayer(interaction.user);
    return interaction.reply([
      `Profile forged for **${player.name}**`,
      `Race: **${player.race.name}** (${player.race.rarity})`,
      `Root: **${player.root.name}** (${player.root.rarity})`,
      `Talent: **${player.talent.name}** (${player.talent.rarity})`
    ].join('\n'));
  }
};

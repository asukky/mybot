const { SlashCommandBuilder } = require('discord.js');
const { RARITIES, ENTRIES_PER_RARITY } = require('../data/customization');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Show command help.'),
  async execute(interaction) {
    return interaction.reply([
      '**Commands**',
      '/start /name /profile /route /meditate /breakthrough /hunt /kill /sect /help',
      `Trait generation: ${ENTRIES_PER_RARITY} entries per rarity for ${RARITIES.join(', ')}`
    ].join('\n'));
  }
};

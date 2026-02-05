const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sect')
    .setDescription('Sect management')
    .addSubcommand((s) => s.setName('create').setDescription('Create sect').addStringOption((o) => o.setName('name').setDescription('name').setRequired(true)))
    .addSubcommand((s) => s.setName('invite').setDescription('Invite').addUserOption((o) => o.setName('user').setDescription('user').setRequired(true)))
    .addSubcommand((s) => s.setName('join').setDescription('Join sect'))
    .addSubcommand((s) => s.setName('donate').setDescription('Donate').addIntegerOption((o) => o.setName('amount').setDescription('amount').setRequired(true).setMinValue(1)))
    .addSubcommand((s) => s.setName('upgrade').setDescription('Upgrade').addStringOption((o) => o.setName('building').setDescription('building').setRequired(true).addChoices({ name: 'hall', value: 'hall' }, { name: 'formation', value: 'formation' }, { name: 'library', value: 'library' })))
    .addSubcommand((s) => s.setName('war').setDescription('War npc').addIntegerOption((o) => o.setName('npc_index').setDescription('index').setRequired(true).setMinValue(1)))
    .addSubcommand((s) => s.setName('info').setDescription('Sect info')),
  async execute(interaction, ctx) {
    const player = ctx.game.getPlayer(interaction.user.id);
    if (!player) return interaction.reply({ content: 'Use /start first.', ephemeral: true });

    const sub = interaction.options.getSubcommand();
    if (sub === 'create') {
      if (player.sectId) return interaction.reply('You are already in a sect.');
      const sect = ctx.world.createSect(player, interaction.options.getString('name', true));
      return interaction.reply(`Sect **${sect.name}** created. You are the Sect Master.`);
    }
    if (sub === 'invite') {
      if (!player.sectId) return interaction.reply('You need a sect first.');
      if (player.sectRank !== 'Sect Master' && player.sectRank !== 'Elder') return interaction.reply('Only Sect Master or Elders can invite.');
      const user = interaction.options.getUser('user', true);
      const sect = ctx.world.getSect(player.sectId);
      ctx.world.createInvite(sect.id, player.userId, user.id);
      return interaction.reply(`Invitation sent to ${user.username}.`);
    }
    if (sub === 'join') {
      if (player.sectId) return interaction.reply('You are already in a sect.');
      const sect = ctx.world.acceptInvite(player);
      return interaction.reply(sect ? `You joined **${sect.name}**.` : 'No pending sect invite.');
    }
    if (sub === 'donate') {
      if (!player.sectId) return interaction.reply('Join a sect first.');
      const amount = interaction.options.getInteger('amount', true);
      if (player.spiritStones < amount) return interaction.reply('Not enough spirit stones.');
      const sect = ctx.world.getSect(player.sectId);
      player.spiritStones -= amount;
      sect.treasury += amount;
      sect.power += Math.floor(amount / 20);
      return interaction.reply(`Donated ${amount}. Sect treasury: ${sect.treasury}.`);
    }
    if (sub === 'upgrade') {
      if (!player.sectId) return interaction.reply('Join a sect first.');
      if (player.sectRank !== 'Sect Master') return interaction.reply('Only Sect Master can upgrade.');
      const sect = ctx.world.getSect(player.sectId);
      const building = interaction.options.getString('building', true);
      const cost = sect.upgrades[building] * 1500;
      if (sect.treasury < cost) return interaction.reply(`Need ${cost} treasury.`);
      sect.treasury -= cost;
      sect.upgrades[building] += 1;
      sect.power += 200;
      return interaction.reply(`${building} upgraded to Lv${sect.upgrades[building]}.`);
    }
    if (sub === 'war') {
      if (!player.sectId) return interaction.reply('Join or create a sect first.');
      if (player.sectRank !== 'Sect Master') return interaction.reply('Only Sect Master can declare war.');
      const sect = ctx.world.getSect(player.sectId);
      const npc = ctx.world.npcSects[interaction.options.getInteger('npc_index', true) - 1];
      if (!npc) return interaction.reply(`Choose target 1-${ctx.world.npcSects.length}.`);
      const playerPower = sect.power + player.combatPower;
      const npcPower = npc.power + Math.random() * 400;
      if (playerPower >= npcPower) {
        sect.treasury += npc.treasury;
        sect.power += Math.floor(npc.power / 5);
        return interaction.reply(`War won vs **${npc.name}**. Looted ${npc.treasury}.`);
      }
      sect.power = Math.max(100, sect.power - 180);
      return interaction.reply(`War lost vs **${npc.name}**.`);
    }

    if (!player.sectId) return interaction.reply('You are sectless.');
    const sect = ctx.world.getSect(player.sectId);
    return interaction.reply([`Sect: **${sect.name}**`, `Power: ${sect.power} | Treasury: ${sect.treasury}`, `Members: ${sect.members.size}`, `Upgrades => hall:${sect.upgrades.hall}, formation:${sect.upgrades.formation}, library:${sect.upgrades.library}`].join('\n'));
  }
};

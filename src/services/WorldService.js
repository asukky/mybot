const { randomInt } = require('../utils/random');

class WorldService {
  constructor() {
    this.sects = new Map();
    this.pendingInvites = new Map();
    this.npcSects = [
      { name: 'Crimson Abyss Hall', power: 300, treasury: 5000 },
      { name: 'Thunderpeak Pavilion', power: 420, treasury: 7500 },
      { name: 'Void Lotus Sanctuary', power: 620, treasury: 11000 },
      { name: 'Moonfang Citadel', power: 860, treasury: 16000 },
      { name: 'Nine Hells Monastery', power: 1200, treasury: 26000 }
    ];
  }

  createSect(owner, name) {
    const id = `sect-${Date.now()}-${randomInt(100, 999)}`;
    const sect = {
      id,
      name,
      ownerId: owner.userId,
      treasury: 0,
      power: 200,
      upgrades: { hall: 1, formation: 1, library: 1 },
      members: new Map([[owner.userId, 'Sect Master']])
    };
    this.sects.set(id, sect);
    owner.sectId = id;
    owner.sectRank = 'Sect Master';
    return sect;
  }

  getSect(id) {
    return this.sects.get(id) || null;
  }

  createInvite(sectId, inviterId, targetId) {
    this.pendingInvites.set(targetId, { sectId, inviterId, createdAt: Date.now() });
  }

  acceptInvite(player) {
    const invite = this.pendingInvites.get(player.userId);
    if (!invite) return null;
    const sect = this.sects.get(invite.sectId);
    if (!sect) return null;
    sect.members.set(player.userId, 'Disciple');
    player.sectId = sect.id;
    player.sectRank = 'Disciple';
    this.pendingInvites.delete(player.userId);
    return sect;
  }
}

module.exports = { WorldService };

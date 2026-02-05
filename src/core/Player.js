const { REALMS } = require('../data/realms');

class Player {
  constructor({ userId, username, race, root, talent }) {
    this.userId = userId;
    this.name = username;
    this.realmIndex = 0;
    this.xp = 0;
    this.qi = 0;
    this.spiritStones = 250;
    this.route = 'righteous';
    this.race = race;
    this.root = root;
    this.talent = talent;
    this.stats = { hp: 140, attack: 22, defense: 14, speed: 12 };
    this.lastMeditationAt = 0;
    this.lastHuntAt = 0;
    this.sectId = null;
    this.sectRank = null;
    this.kills = 0;
    this.npcKills = 0;
  }

  get realm() {
    return REALMS[this.realmIndex];
  }

  get combatPower() {
    return this.realmIndex * 8 + this.stats.attack * 2.3 + this.stats.defense * 1.9 + this.stats.speed * 1.4 + this.stats.hp * 0.13;
  }
}

module.exports = { Player };

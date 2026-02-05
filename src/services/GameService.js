const { REALMS, TOTAL_REALM_COUNT } = require('../data/realms');
const { RACES, ROOTS, TALENTS, pickRandomByRarity } = require('../data/customization');
const { randomInt, chance } = require('../utils/random');
const { Player } = require('../core/Player');

class GameService {
  constructor(world) {
    this.players = new Map();
    this.world = world;
  }

  hasProfile(userId) {
    return this.players.has(userId);
  }

  createPlayer(user) {
    const player = new Player({
      userId: user.id,
      username: user.username,
      race: pickRandomByRarity(RACES),
      root: pickRandomByRarity(ROOTS),
      talent: pickRandomByRarity(TALENTS)
    });
    this.players.set(player.userId, player);
    return player;
  }

  getPlayer(id) {
    return this.players.get(id) || null;
  }

  renamePlayer(player, newName) {
    const clean = newName.trim().slice(0, 24);
    if (!clean) return 'Name cannot be empty.';
    player.name = clean;
    return `Name set to **${player.name}**.`;
  }

  setRoute(player, route) {
    if (!['righteous', 'demonic'].includes(route)) return 'Route must be righteous or demonic.';
    player.route = route;
    return `You now walk the **${route}** path.`;
  }

  meditate(player) {
    if (Date.now() - player.lastMeditationAt < 60000) return 'Meditation cooldown active (60s).';
    player.lastMeditationAt = Date.now();
    const qiGain = Math.floor(randomInt(80, 160) * player.root.qiMultiplier * player.race.cultivationSpeed);
    const xpGain = Math.floor(randomInt(65, 130) * player.talent.xpMultiplier);
    player.qi += qiGain;
    player.xp += xpGain;
    player.spiritStones += randomInt(30, 90);
    return `You meditate and gain **${qiGain} qi** and **${xpGain} xp**.`;
  }

  breakthrough(player) {
    const next = REALMS[player.realmIndex + 1];
    if (!next) return 'You stand at the absolute summit.';
    if (player.xp < next.xpRequired || player.qi < next.qiRequired) return `Need ${next.xpRequired} xp and ${next.qiRequired} qi to break through.`;
    const successRate = Math.min(0.95, 0.48 + player.root.breakthroughBonus + player.realmIndex * 0.0008);
    if (!chance(successRate)) {
      const backlash = randomInt(120, 280);
      player.qi = Math.max(0, player.qi - backlash);
      return `Breakthrough failed. Qi deviation drained ${backlash} qi.`;
    }

    player.realmIndex += 1;
    const bonus = Math.floor(next.statBonus * player.talent.statMultiplier);
    player.stats.attack += bonus;
    player.stats.defense += Math.ceil(bonus * 0.72);
    player.stats.speed += Math.ceil(bonus * 0.55);
    player.stats.hp += bonus * 13;
    return `Breakthrough success! You reached **${player.realm.name}**.`;
  }

  huntNpc(player) {
    if (Date.now() - player.lastHuntAt < 45000) return 'Hunt cooldown active (45s).';
    player.lastHuntAt = Date.now();
    const enemyPower = randomInt(120, 420) + player.realmIndex * 7;
    if (player.combatPower >= enemyPower) {
      const xp = randomInt(140, 300);
      const qi = randomInt(100, 210);
      const stones = randomInt(90, 210);
      player.xp += xp;
      player.qi += qi;
      player.spiritStones += stones;
      player.npcKills += 1;
      if (player.route === 'demonic') player.stats.attack += 2;
      return `NPC slain. +${xp} xp, +${qi} qi, +${stones} stones.`;
    }
    const damage = randomInt(30, 75);
    player.stats.hp = Math.max(1, player.stats.hp - damage);
    return `You failed to kill the NPC and suffered ${damage} damage.`;
  }

  pvp(attacker, defender) {
    if (!defender) return 'Target has no profile yet.';
    if (attacker.userId === defender.userId) return 'You cannot challenge yourself.';
    const atk = attacker.combatPower + randomInt(0, 160);
    const def = defender.combatPower + randomInt(0, 160);
    if (atk >= def) {
      const reward = Math.min(defender.spiritStones, randomInt(100, 320));
      defender.spiritStones -= reward;
      attacker.spiritStones += reward;
      attacker.kills += 1;
      if (attacker.route === 'demonic') {
        attacker.stats.attack += 3;
        attacker.qi += 90;
      }
      return `You defeated ${defender.name} and seized ${reward} spirit stones.`;
    }
    const penalty = Math.min(attacker.spiritStones, randomInt(40, 130));
    attacker.spiritStones -= penalty;
    defender.spiritStones += penalty;
    return `You lost to ${defender.name} and lost ${penalty} spirit stones.`;
  }

  getStatusFields(player) {
    return {
      name: player.name,
      route: player.route,
      realm: `${player.realm.name} (${player.realmIndex + 1}/${TOTAL_REALM_COUNT * 9})`,
      progression: `XP ${player.xp} | Qi ${player.qi} | Stones ${player.spiritStones}`,
      stats: `HP ${player.stats.hp} | ATK ${player.stats.attack} | DEF ${player.stats.defense} | SPD ${player.stats.speed}`,
      kills: `${player.kills} players / ${player.npcKills} NPCs`
    };
  }
}

module.exports = { GameService };

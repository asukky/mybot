const { RARITIES, pickRandomByRarity } = require('./generators/rarities');
const { ENTRIES_PER_RARITY: RACE_ENTRIES_PER_RARITY, buildRacePool } = require('./generators/racePool');
const { ENTRIES_PER_RARITY: ROOT_ENTRIES_PER_RARITY, buildRootPool } = require('./generators/rootPool');
const { ENTRIES_PER_RARITY: TALENT_ENTRIES_PER_RARITY, buildTalentPool } = require('./generators/talentPool');

const ENTRIES_PER_RARITY = Math.min(
  RACE_ENTRIES_PER_RARITY,
  ROOT_ENTRIES_PER_RARITY,
  TALENT_ENTRIES_PER_RARITY
);

const RACES = buildRacePool();
const ROOTS = buildRootPool();
const TALENTS = buildTalentPool();

module.exports = {
  RARITIES,
  ENTRIES_PER_RARITY,
  RACES,
  ROOTS,
  TALENTS,
  pickRandomByRarity
};
const RARITIES = ['common', 'rare', 'epic', 'legendary', 'mythic', 'godlike'];
const ENTRIES_PER_RARITY = 100;

const RARITY_MULTIPLIER = {
  common: 1,
  rare: 1.08,
  epic: 1.18,
  legendary: 1.32,
  mythic: 1.5,
  godlike: 1.75
};

const NAME_PARTS = {
  race: {
    left: ['Azure', 'Crimson', 'Jade', 'Iron', 'Obsidian', 'Celestial', 'Abyssal', 'Solar', 'Lunar', 'Storm'],
    right: ['Dragon', 'Tiger', 'Phoenix', 'Serpent', 'Wolf', 'Leviathan', 'Yaksha', 'Titan', 'Sylph', 'Warden']
  },
  root: {
    left: ['Heaven', 'Earth', 'Thunder', 'Void', 'Nether', 'Star', 'Ocean', 'Mountain', 'Shadow', 'Dawn'],
    right: ['Root', 'Meridian', 'Spirit Vein', 'Essence Core', 'Qi Lattice', 'Soul Strand', 'Celestial Stem', 'Dao Artery']
  },
  talent: {
    left: ['War', 'Fate', 'Heavenly', 'Abyss', 'Eternal', 'World', 'Ninefold', 'Ancient', 'Divine', 'Infinite'],
    right: ['Prodigy', 'Body', 'Mind', 'Aptitude', 'Legacy', 'Destiny', 'Will', 'Potential', 'Talent', 'Inheritance']
  }
};

function generatePool(type) {
  const pool = [];
  RARITIES.forEach((rarity) => {
    for (let i = 1; i <= ENTRIES_PER_RARITY; i += 1) {
      const left = NAME_PARTS[type].left[i % NAME_PARTS[type].left.length];
      const right = NAME_PARTS[type].right[(i * 3) % NAME_PARTS[type].right.length];
      const mult = RARITY_MULTIPLIER[rarity];
      pool.push({
        id: `${type}_${rarity}_${i}`,
        rarity,
        name: `${left} ${right} ${i}`,
        cultivationSpeed: Number((1 + (mult - 1) * 0.55).toFixed(3)),
        qiMultiplier: Number((1 + (mult - 1) * 0.6).toFixed(3)),
        breakthroughBonus: Number(((mult - 1) * 0.12).toFixed(3)),
        xpMultiplier: Number((1 + (mult - 1) * 0.5).toFixed(3)),
        statMultiplier: Number((1 + (mult - 1) * 0.45).toFixed(3))
      });
    }
  });
  return pool;
}

const RACES = generatePool('race');
const ROOTS = generatePool('root');
const TALENTS = generatePool('talent');

const RARITY_WEIGHTS = { common: 50, rare: 26, epic: 13, legendary: 7, mythic: 3, godlike: 1 };

function pickRandomByRarity(pool) {
  const roll = Math.random() * 100;
  let cumulative = 0;
  let chosen = 'common';
  Object.entries(RARITY_WEIGHTS).some(([rarity, weight]) => {
    cumulative += weight;
    if (roll <= cumulative) {
      chosen = rarity;
      return true;
    }
    return false;
  });
  const filtered = pool.filter((x) => x.rarity === chosen);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

module.exports = { RARITIES, ENTRIES_PER_RARITY, RACES, ROOTS, TALENTS, pickRandomByRarity };

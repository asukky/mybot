const RARITIES = ['common', 'rare', 'epic', 'legendary', 'mythic', 'godlike'];

const RARITY_MULTIPLIER = {
  common: 1,
  rare: 1.08,
  epic: 1.18,
  legendary: 1.32,
  mythic: 1.5,
  godlike: 1.75
};

const RARITY_WEIGHTS = {
  common: 50,
  rare: 26,
  epic: 13,
  legendary: 7,
  mythic: 3,
  godlike: 1
};

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

  const filtered = pool.filter((item) => item.rarity === chosen);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

module.exports = {
  RARITIES,
  RARITY_MULTIPLIER,
  RARITY_WEIGHTS,
  pickRandomByRarity
};

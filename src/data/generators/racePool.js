const { RARITIES, RARITY_MULTIPLIER } = require('./rarities');

const ENTRIES_PER_RARITY = 120;

const RACE_NAME_PARTS = {
  left: ['Azure', 'Crimson', 'Jade', 'Iron', 'Obsidian', 'Celestial', 'Abyssal', 'Solar', 'Lunar', 'Storm', 'Void', 'Primal'],
  right: ['Dragon', 'Tiger', 'Phoenix', 'Serpent', 'Wolf', 'Leviathan', 'Yaksha', 'Titan', 'Sylph', 'Warden', 'Rakshasa', 'Sentinel']
};

function buildRacePool() {
  const pool = [];

  RARITIES.forEach((rarity) => {
    const mult = RARITY_MULTIPLIER[rarity];
    for (let i = 1; i <= ENTRIES_PER_RARITY; i += 1) {
      const left = RACE_NAME_PARTS.left[i % RACE_NAME_PARTS.left.length];
      const right = RACE_NAME_PARTS.right[(i * 3) % RACE_NAME_PARTS.right.length];

      pool.push({
        id: `race_${rarity}_${i}`,
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

module.exports = { ENTRIES_PER_RARITY, buildRacePool };

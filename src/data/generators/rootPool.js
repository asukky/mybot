const { RARITIES, RARITY_MULTIPLIER } = require('./rarities');

const ENTRIES_PER_RARITY = 120;

const ROOT_NAME_PARTS = {
  left: ['Heaven', 'Earth', 'Thunder', 'Void', 'Nether', 'Star', 'Ocean', 'Mountain', 'Shadow', 'Dawn', 'Chaos', 'Radiant'],
  right: ['Root', 'Meridian', 'Spirit Vein', 'Essence Core', 'Qi Lattice', 'Soul Strand', 'Celestial Stem', 'Dao Artery', 'Fate Thread', 'Origin Seed']
};

function buildRootPool() {
  const pool = [];

  RARITIES.forEach((rarity) => {
    const mult = RARITY_MULTIPLIER[rarity];
    for (let i = 1; i <= ENTRIES_PER_RARITY; i += 1) {
      const left = ROOT_NAME_PARTS.left[i % ROOT_NAME_PARTS.left.length];
      const right = ROOT_NAME_PARTS.right[(i * 3) % ROOT_NAME_PARTS.right.length];

      pool.push({
        id: `root_${rarity}_${i}`,
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

module.exports = { ENTRIES_PER_RARITY, buildRootPool };

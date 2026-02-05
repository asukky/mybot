const { RARITIES, RARITY_MULTIPLIER } = require('./rarities');

const ENTRIES_PER_RARITY = 120;

const TALENT_NAME_PARTS = {
  left: ['War', 'Fate', 'Heavenly', 'Abyss', 'Eternal', 'World', 'Ninefold', 'Ancient', 'Divine', 'Infinite', 'Primal', 'Sovereign'],
  right: ['Prodigy', 'Body', 'Mind', 'Aptitude', 'Legacy', 'Destiny', 'Will', 'Potential', 'Talent', 'Inheritance', 'Genius', 'Instinct']
};

function buildTalentPool() {
  const pool = [];

  RARITIES.forEach((rarity) => {
    const mult = RARITY_MULTIPLIER[rarity];
    for (let i = 1; i <= ENTRIES_PER_RARITY; i += 1) {
      const left = TALENT_NAME_PARTS.left[i % TALENT_NAME_PARTS.left.length];
      const right = TALENT_NAME_PARTS.right[(i * 3) % TALENT_NAME_PARTS.right.length];

      pool.push({
        id: `talent_${rarity}_${i}`,
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

module.exports = { ENTRIES_PER_RARITY, buildTalentPool };

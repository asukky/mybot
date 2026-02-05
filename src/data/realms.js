const STAGES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const REALM_BANDS = [
  'Mortal',
  'Senior',
  'Immortal',
  'Heavenly',
  'Divine',
  'Saint',
  'Dao',
  'Eternal'
];

const TIERS_PER_BAND = 100;

const REALM_TIERS = [];
REALM_BANDS.forEach((band) => {
  for (let i = 1; i <= TIERS_PER_BAND; i += 1) {
    REALM_TIERS.push(`${band} Realm ${i}`);
  }
});

const REALMS = [];
REALM_TIERS.forEach((tierName, tierIndex) => {
  const bandIndex = Math.floor(tierIndex / TIERS_PER_BAND);
  const bandScaling = 1 + bandIndex * 0.85;

  STAGES.forEach((stageName, stageIndex) => {
    const level = tierIndex * STAGES.length + stageIndex;
    const stageScaling = 1 + stageIndex * 0.08;

    REALMS.push({
      id: level,
      tier: tierName,
      stage: stageName,
      name: `${tierName} ${stageName}`,
      xpRequired: Math.floor((180 + level * 52 + level ** 1.58) * bandScaling * stageScaling),
      qiRequired: Math.floor((140 + level * 43 + level ** 1.52) * bandScaling * stageScaling),
      statBonus: Math.floor((3 + Math.floor(level / 2)) * (1 + bandIndex * 0.12))
    });
  });
});

module.exports = {
  STAGES,
  REALM_BANDS,
  TIERS_PER_BAND,
  REALM_TIERS,
  REALMS,
  TOTAL_REALM_COUNT: REALM_TIERS.length
};

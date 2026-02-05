const STAGES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

const MAJOR_REALM_BANDS = [
  {
    band: 'Mortal',
    baseNames: [
      'Body Tempering',
      'Qi Condensation',
      'Foundation Establishment',
      'Core Formation',
      'Nascent Soul',
      'Spirit Severing',
      'Void Refinement',
      'Tribulation Crossing'
    ]
  },
  {
    band: 'Immortal',
    baseNames: [
      'Earth Immortal',
      'Heaven Immortal',
      'True Immortal',
      'Golden Immortal',
      'Grand Immortal',
      'Immortal Monarch',
      'Immortal Emperor',
      'Immortal Ancestor'
    ]
  },
  {
    band: 'Heavenly',
    baseNames: [
      'Heavenly Knight',
      'Heavenly Lord',
      'Heavenly King',
      'Heavenly Emperor',
      'Heavenly Saint',
      'Heavenly Monarch',
      'Heavenly Tyrant',
      'Heavenly Origin'
    ]
  },
  {
    band: 'Divine',
    baseNames: [
      'Divine Flame',
      'Divine Ocean',
      'Divine Mountain',
      'Divine Sun',
      'Divine Moon',
      'Divine Star',
      'Divine Fate',
      'Divine Origin'
    ]
  },
  {
    band: 'Grand Divine',
    baseNames: [
      'Grand Divine Seed',
      'Grand Divine Bloom',
      'Grand Divine Spirit',
      'Grand Divine Monarch',
      'Grand Divine Emperor',
      'Grand Divine Sovereign',
      'Grand Divine Ancestor',
      'Grand Divine Eternity'
    ]
  }
];

const REALMS_PER_BAND = 100;
const TOTAL_MAJOR_REALMS = MAJOR_REALM_BANDS.length * REALMS_PER_BAND;

const PREFIXES = ['Azure', 'Crimson', 'Golden', 'Obsidian', 'Celestial', 'Abyssal', 'Solar', 'Lunar', 'Storm', 'Eternal'];
const TITLES = ['Path', 'Domain', 'Throne', 'Crown', 'Pillar', 'Gate', 'Heart', 'Soul', 'Origin', 'Mandate'];

const REALM_TIERS = [];
MAJOR_REALM_BANDS.forEach((group, bandIndex) => {
  const names = [...group.baseNames];

  for (let i = names.length + 1; i <= REALMS_PER_BAND; i += 1) {
    const prefix = PREFIXES[(i + bandIndex * 2) % PREFIXES.length];
    const base = group.baseNames[(i * 3 + bandIndex) % group.baseNames.length];
    const title = TITLES[(i * 5 + bandIndex) % TITLES.length];
    names.push(`${prefix} ${base} ${title}`);
  }

  names.forEach((name, idx) => {
    REALM_TIERS.push({ band: group.band, tierInBand: idx + 1, name });
  });
});

const REALMS = [];
REALM_TIERS.forEach((tier, tierIndex) => {
  const bandIndex = Math.floor(tierIndex / REALMS_PER_BAND);
  const bandScaling = 1 + bandIndex * 1.25;

  STAGES.forEach((stageName, stageIndex) => {
    const level = tierIndex * STAGES.length + stageIndex;
    const stageScaling = 1 + stageIndex * 0.12;

    REALMS.push({
      id: level,
      band: tier.band,
      tierInBand: tier.tierInBand,
      tier: tier.name,
      stage: stageName,
      name: `${tier.name} ${stageName}`,
      xpRequired: Math.floor((320 + level * 82 + level ** 1.72) * bandScaling * stageScaling),
      qiRequired: Math.floor((250 + level * 68 + level ** 1.66) * bandScaling * stageScaling),
      statBonus: Math.floor((5 + Math.floor(level / 2)) * (1 + bandIndex * 0.2))
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
  MAJOR_REALM_BANDS,
  REALMS_PER_BAND,
  REALM_TIERS,
  REALMS,
  TOTAL_MAJOR_REALMS,
  REALM_BANDS,
  TIERS_PER_BAND,
  REALM_TIERS,
  REALMS,
  TOTAL_REALM_COUNT: REALM_TIERS.length
};

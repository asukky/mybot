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

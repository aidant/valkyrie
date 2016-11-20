const BATTLETAG_REGEX = /^[a-zA-Z0-9]+#[0-9]{4,5}$/;
const VALID_MODES = ['quickplay', 'competitive'];
const VALID_REGIONS = ['eu', 'us', 'kr', 'cn'];
const VALID_PLATFORMS = ['pc', 'xbl', 'psn'];
const VALID_HEROS = ['Genji', 'McCree', 'Pharah', 'Reaper', 'Soldier76', 'Sombra', 'Tracer', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Torbjoern', 'Widowmaker', 'DVa', 'Reinhardt', 'Roadhog', 'Winston', 'Zarya', 'Ana', 'Lucio', 'Mercy', 'Symmetra', 'Zenyatta'];

export function validateBattleTag(battleTag) {
  return BATTLETAG_REGEX.test(battleTag);
}

export function validateMode(mode) {
  return VALID_MODES.includes(mode);
}

export function validateRegion(region) {
  return VALID_REGIONS.includes(region);
}

export function validatePlatform(platform) {
  return VALID_PLATFORMS.includes(platform);
}

export function validateHeros(hero) {
  return VALID_HEROS.includes(hero);
}

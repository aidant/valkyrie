const BATTLETAG_REGEX = /^[a-zA-Z0-9]+#[0-9]{4,5}$/;
const VALID_REGIONS = ['eu', 'us', 'kr', 'cn'];
const VALID_PLATFORMS = ['pc', 'xbl', 'psn'];

export function validateBattleTag(battleTag) {
  return BATTLETAG_REGEX.test(battleTag);
}

export function validateRegion(region) {
  return VALID_REGIONS.includes(region);
}

export function validatePlatform(platform) {
  return VALID_PLATFORMS.includes(platform);
}

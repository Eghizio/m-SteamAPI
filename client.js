const Hosts = Object.freeze({
  Steam: "https://api.steampowered.com",
  SteamCommunity: "https://steamcommunity.com",
});

const get = (url, host = Hosts.Steam) => fetch(`${host}${url}`).then(res => res.json()); // todo some error handling

// tbh could pass more params to the Client config here
module.exports = (apiKey) => ({
  get: {},
  getPlayerCount: (appID) => get(`/ISteamUserStats/GetNumberOfCurrentPlayers/v1?key=${apiKey}&appid=${appID}`),
  getPlayerSummaries: (steamID) => get(`/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`),
  getUserGroups: (steamID) => get(`/ISteamUser/GetUserGroupList/v1/?key=${apiKey}&steamid=${steamID}`),
  resolveVanityUrl: (vanityURL) => get(`/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityURL}`),
  getUserBans: (steamID) => get(`/ISteamUser/GetPlayerBans/v1/?key=${apiKey}&steamids=${steamID}`),
  getGameAchievements: (appID) => get(`/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appID}`),
  getUserStatsForGame: (steamID, appID) => get(`/ISteamUserStats/GetUserStatsForGame/v2/?key=${apiKey}&steamid=${steamID}&appid=${appID}`),
  getSteamGames: () => get(`/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false&max_results=50000`),
  getSteamSoftware: () => get(`/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=false&include_dlc=false&include_software=true&include_videos=false&include_hardware=false&max_results=50000`),
  getUserBadges: (steamID) => get(`/IPlayerService/GetBadges/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserCommunityBadgeProgress: (steamID) => get(`/IPlayerService/GetCommunityBadgeProgress/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserDisplayedBadge: (steamID) => get(`/IPlayerService/GetFavoriteBadge/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserGames: (steamID) => get(`/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserCustomizationDetails: (steamID) => get(`/IPlayerService/GetProfileCustomization/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserProfileItemsEquipped: (steamID) => get(`/IPlayerService/GetProfileItemsEquipped/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserRecentlyPlayedGames: (steamID) => get(`/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserLevel: (steamID) => get(`/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamID}`),
  getLevelDistribution: (playerLevel) => get(`/IPlayerService/GetSteamLevelDistribution/v1/?key=${apiKey}&player_level=${playerLevel}`),
  getAppNews: (appID) => get(`/ISteamNews/GetNewsForApp/v2/?key=${apiKey}&appid=${appID}`),
  getInventory: (appID, steamID) => get(`/inventory/${steamID}/${appID}/2?l=english&count=1000&json=1`, Hosts.SteamCommunity),
});
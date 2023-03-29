const get = (url) => fetch(url).then(res => res.json()); // todo some error handling

const Hosts = Object.freeze({
  Steam: "https://api.steampowered.com",
  SteamCommunity: "https://steamcommunity.com",
});

// tbh could pass more params to the Client config here
module.exports = (apiKey) => ({
  getPlayerCount: (appID) => get(`${Hosts.Steam}/ISteamUserStats/GetNumberOfCurrentPlayers/v1?key=${apiKey}&appid=${appID}`),
  getPlayerSummaries: (steamID) => get(`${Hosts.Steam}/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`),
  getUserGroups: (steamID) => get(`${Hosts.Steam}/ISteamUser/GetUserGroupList/v1/?key=${apiKey}&steamid=${steamID}`),
  resolveVanityUrl: (vanityURL) => get(`${Hosts.Steam}/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanityURL}`),
  getUserBans: (steamID) => get(`${Hosts.Steam}/ISteamUser/GetPlayerBans/v1/?key=${apiKey}&steamids=${steamID}`),
  getGameAchievements: (appID) => get(`${Hosts.Steam}/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${appID}`),
  getUserStatsForGame: (steamID, appID) => get(`${Hosts.Steam}/ISteamUserStats/GetUserStatsForGame/v2/?key=${apiKey}&steamid=${steamID}&appid=${appID}`),
  getSteamGames: () => get(`${Hosts.Steam}/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false&max_results=50000`),
  getSteamSoftware: () => get(`${Hosts.Steam}/IStoreService/GetAppList/v1/?key=${apiKey}&include_games=false&include_dlc=false&include_software=true&include_videos=false&include_hardware=false&max_results=50000`),
  getUserBadges: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetBadges/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserCommunityBadgeProgress: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetCommunityBadgeProgress/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserDisplayedBadge: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetFavoriteBadge/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserGames: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserCustomizationDetails: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetProfileCustomization/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserProfileItemsEquipped: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetProfileItemsEquipped/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserRecentlyPlayedGames: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamID}`),
  getUserLevel: (steamID) => get(`${Hosts.Steam}/IPlayerService/GetSteamLevel/v1/?key=${apiKey}&steamid=${steamID}`),
  getLevelDistribution: (playerLevel) => get(`${Hosts.Steam}/IPlayerService/GetSteamLevelDistribution/v1/?key=${apiKey}&player_level=${playerLevel}`),
  getAppNews: (appID) => get(`${Hosts.Steam}/ISteamNews/GetNewsForApp/v2/?key=${apiKey}&appid=${appID}`),
  getInventory: (appID, steamID) => get(`${Hosts.SteamCommunity}/inventory/${steamID}/${appID}/2?l=english&count=1000&json=1`),
});
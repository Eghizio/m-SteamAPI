const Client = require("./client");

module.exports = (apiKey) => {
    const client = Client(apiKey);

    return {
        /**
         * @name                  getPlayerCount
         * @description           Get back player count from specified Steam app ID.
         * @author                m.
         * @param   {String}      appID                 Specify an app ID to get data from.
         * 
         * @returns {String}
         */
        getPlayerCount: (appID) => client.getPlayerCount(appID).then(res => res.response.player_count), // toString?
        /**
         * @name                  getPlayerSummaries
         * @description           Get back player data from specified SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an SteamID64 to get data from.
         * 
         * @returns {Object}
         */
        getPlayerSummaries: (steamID) => client.getPlayerSummaries(steamID).then((res) => res.response.players[0]),
        /**
         * @name                  getUserGroups
         * @description           Get back user groups list from specified SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an SteamID64 to get data from.
         * 
         * @returns {Array}
         */
        getUserGroups: (steamID) => client.getUserGroups(steamID).then(res => res.response.groups.map(group => group.gid)),
        /**
         * @name                  resolveVanityUrl
         * @description           Get back user SteamID64 from VanityURL.
         * @author                m.
         * @param   {String}      vanityURL              Specify an VanityURL to get SteamID64 from.
         * 
         * @returns {String}
         */
        resolveVanityUrl: (vanityURL) => client.resolveVanityUrl(vanityURL).then(({ response: { success, steamid } }) =>
            success ? steamid : `Couldn't find SteamID for specified VanityURL!`
        ), // should just throw tbh. you are hiding errors
        /**
         * @name                  getUserBans
         * @description           Get user ban stats from SteamID64.
         * @author                m.
         * @param   {String}      steamID                Specify an steamID to get ban stats from.
         * 
         * @returns {Object}
         */
        getUserBans: (steamID) => client.getUserBans(steamID).then(({ players }) => {
            const [first] = players;
            return {
                communityBanned: first.CommunityBanned,
                economyBanned: first.EconomyBan,
                vacBanned: first.VACBanned,
                numberOfVacBans: first.NumberOfVACBans,
                sinceLastBan: first.DaysSinceLastBan,
                numberOfGameBans: first.NumberOfGameBans,
            };
        }),
        /**
         * @name                  getGameAchievements
         * @description           Get list of achievements from specified appID.
         * @author                m.
         * @param   {String}      appID              Specify an appID to get achievements Array back.
         * 
         * @returns {Array}
         */
        getGameAchievements: (appID) => client.getGameAchievements(appID).then(({ game }) =>
            game.availableGameStats.achievements.map(({ displayName, description, icon, icongray, hidden }) => ({
                name: displayName,
                description,
                icon,
                icongray,
                hidden: Boolean(hidden)
            }))
        ),
        /**
         * @name                  getUserStatsForGame
         * @description           Get user achievements from specified appID.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get statistics from.
         * @param   {String}      appID              Specify an appID to get user statistics from.
         * 
         * @returns {Array}
         */
        getUserStatsForGame: (steamID, appID) => client.getUserStatsForGame(steamID, appID).then(res => res.playerstats.stats),
        /**
         * @name                  getSteamGames
         * @description           Returns Steam games from store.
         * @author                m.
         * 
         * @returns {Array}
         */
        getSteamGames: () => client.getSteamGames().then(res => res.response.apps),
        /**
         * @name                  getSteamSoftware
         * @description           Returns Steam software from store.
         * @author                m.
         * 
         * @returns {Array}
         */
        getSteamSoftware: () => client.getSteamSoftware().then(res => res.response.apps),
        /**
         * @name                  getUserBadges
         * @description           Returns user owned Steam badges.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badges from.
         * 
         * @returns {Array}
         */
        getUserBadges: (steamID) => client.getUserBadges(steamID).then(res => res.response.badges),
        /**
         * @name                  getUserCommunityBadgeProgress
         * @description           Returns user Community Badge progress.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badge progress from.
         * 
         * @returns {Array}
         */
        getUserCommunityBadgeProgress: (steamID) => client.getUserCommunityBadgeProgress(steamID).then(res => res.response.quests),

        /**
         * @name                  getUserDisplayedBadge
         * @description           Returns user's displayed badge details.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get badge details from.
         * 
         * @returns {Object}
         */
        getUserDisplayedBadge: (steamID) => client.getUserDisplayedBadge(steamID).then((res) => res.response),

        /**
         * @name                  getUserGames
         * @description           Returns list of user's owned games.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get game details from.
         * 
         * @returns {Object}
         */
        getUserGames: (steamID) => client.getUserGames(steamID).then(({ response: { game_count: gameCount, games } }) => ({ gameCount, games })),
        /**
         * @name                  getUserCustomizationDetails
         * @description           Returns user's profile customization details.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get user customization details from.
         * 
         * @returns {Object}
         */
        getUserCustomizationDetails: (steamID) => client.getUserCustomizationDetails(steamID).then(res => res.response.customizations),
        /**
         * @name                  getUserProfileItemsEquipped
         * @description           Returns user's profile items equipped.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get equipped items details from.
         * 
         * @returns {Object}
         */
        getUserProfileItemsEquipped: (steamID) => client.getUserProfileItemsEquipped(steamID).then(({ response }) => {
            const mapItems = (key) => ({
                itemName: response[key].name,
                itemDescription: response[key].item_description,
                imageUrl: `http://media.steampowered.com/steamcommunity/public/images/${response[key].image_large}`,
                itemId: response[key].communityitemid,
                appId: response[key].appid
            });

            return {
                profileBackground: mapItems("profile_background"),
                miniProfileBackground: mapItems("mini_profile_background"),
                avatarFrame: mapItems("avatar_frame"),
                animatedAvatar: mapItems("animated_avatar"),
                profileModifier: mapItems("profile_modifier"),
                steamDeckKeyboardSkin: mapItems("steam_deck_keyboard_skin"),
            }
        }),
        /**
         * @name                  getUserRecentlyPlayedGames
         * @description           Returns user's recently played games count and list.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get recently played games from.
         * 
         * @returns {Object}
         */
        getUserRecentlyPlayedGames: (steamID) => client.getUserRecentlyPlayedGames(steamID).then(({ response }) => ({
            gameCount: response.total_count,
            games: response.games
        })),
        /**
         * @name                  getUserLevel
         * @description           Returns user's Steam level.
         * @author                m.
         * @param   {String}      steamID            Specify an steamID to get level details from.
         * 
         * @returns {String}
         */
        getUserLevel: (steamID) => client.getUserLevel(steamID).then(({ response: { player_level } }) => player_level),
        /**
         * @name                  getLevelDistribution
         * @description           Returns data about Steam level distribution.
         * @author                m.
         * @param   {String}      playerLevel        Specify an Steam level to get distribution details from.
         * 
         * @returns {String}
         */
        getLevelDistribution: (playerLevel) => client.getLevelDistribution(playerLevel).then(({ response: { player_level_percentile } }) => player_level_percentile),
        /**
         * @name                  getAppNews
         * @description           Returns news of providen appID.
         * @author                m.
         * @param   {String}      appID               Specify an appID get news from.
         * 
         * @returns {String}
         */
        getAppNews: (appID) => client.getAppNews(appID).then(({ appnews: { newsitems } }) => newsitems),
        /**
         * @name                  getInventory
         * @description           Returns Array with inventory items.
         * @author                m.
         * @param   {String}      appID               Specify an appID to get inventory from.
         * @param   {String}      steamID             Specify an steamID to get inventory from.
         * 
         * @returns {Array}
         */
        getInventory: (appID, steamID) => client.getInventory(appID, steamID)
            .then(({ descriptions }) => descriptions
                .map(({ market_name, appid, actions, icon_url_large, tradable, marketable, tags, name_color, type }) => ({
                    appId: appid,
                    itemName: market_name,
                    itemTradeable: Boolean(tradable),
                    itemMarketable: Boolean(marketable),
                    inspectLink: actions[0].link || null,
                    itemNameColor: name_color,
                    itemType: type,
                    imageUrl: `https://community.akamai.steamstatic.com/economy/image/${icon_url_large}`,
                    tags: tags.map(tag => tag.localized_tag_name),
                }))
            ),
    };
};
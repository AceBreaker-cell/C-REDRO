const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
    name: "stats",
    description: "Get information about the bot",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["about", "ping", "info"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message) => {
            const { version } = require("discord.js")
            cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");

            const embed = new MessageEmbed()
            embed.setColor("202225")
            embed.setImage("https://media.discordapp.net/attachments/787014823737032716/900217632127606844/standard.png")
            embed.setTitle(`📢・ Information﹕Stats from \`${client.user.username}\``)
            embed.addFields({
                name: '<:ping:907558227376488469> Bot Ping',
                value: `┕\`${Math.round(client.ws.ping)}ms\``,
                inline: true
            },
            {
                name: '<a:minecraftclock:907556556957155349> Uptime',
                value: `┕\`${duration}\``,
                inline: true
            },{
                name: ':file_cabinet: Memory',
                value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
                inline: true
            })

            embed.addFields({
                name: '<a:chest:907560886447792149> Servers',
                value: `┕\`${client.guilds.cache.size}\``,
                inline: true
            },
            {
                name: '<a:stevetwerk:907556556550320158> Users',
                value: `┕\`${client.users.cache.size}\``,
                inline: true
            },{
                name: '<:heart:907561454377521173> API Latency',
                value: `┕\`${(message.client.ws.ping)}ms\``,
                inline: true
            })
            embed.addFields({
                name: '<:villager:907558227871428660> Version',
                value: `┕\`v${require("../package.json").version}\``,
                inline: true
            },{
                name: '<:verified:907558227825262622> Discord.js', 
                value: `┕\`v${version}\``,
                inline: true
            },{
                name: '<:creeper:907558227712036915> Node',
                value: `┕\`${process.version}\``,
                inline: true
            })

        return message.channel.send(embed);
    })
},
SlashCommand: {
/**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
 run: async (client, interaction) => {
        const { version } = require("discord.js")
        cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed()
        embed.setColor("202225")
        embed.setImage("https://media.discordapp.net/attachments/787014823737032716/900217632127606844/standard.png")
        embed.setTitle(`Information﹕Stats from \`${client.user.username}\``)
        embed.addFields({
            name: '<:ping:907558227376488469>  Bot Ping',
            value: `┕\`${Math.round(client.ws.ping)}ms\``,
            inline: true
        },
        {
            name: '<a:minecraftclock:907556556957155349> Uptime',
            value: `┕\`${duration}\``,
            inline: true
        },{
            name: ':file_cabinet: Memory',
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
            inline: true
        })

        embed.addFields({
            name: '<a:chest:907560886447792149> Servers',
            value: `┕\`${client.guilds.cache.size}\``,
            inline: true
        },
        {
            name: '<a:stevetwerk:907556556550320158> Users',
            value: `┕\`${client.users.cache.size}\``,
            inline: true
        },{
            name: '<:heart:907561454377521173>  API Latency',
            value: `┕\`${(client.ws.ping)}ms\``,
            inline: true
        })
        embed.addFields({
            name: '<:villager:907558227871428660> Version',
            value: `┕\`v${require("../package.json").version}\``,
            inline: true
        },{
            name: '<:verified:907558227825262622> Discord.js', 
            value: `┕\`v${version}\``,
            inline: true
        },{
            name: '<:creeper:907558227712036915> Node',
            value: `┕\`${process.version}\``,
            inline: true
        })

    return interaction.send(embed);
})
}
}
};
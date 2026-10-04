const { MessageEmbed } = require("discord.js");
const _ = require("lodash");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "queue",
  description: "Shows all currently enqueued songs",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["q"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "📢・ **Nothing is playing right now...**"
      );

    if (!player.queue || !player.queue.length || player.queue === 0) {
      let QueueEmbed = new MessageEmbed()
        .setAuthor("C-Redro : Currently playing", "https://cdn.discordapp.com/emojis/853350758253330503.png?size=96")
        .setColor("202225")
        .setImage ("https://i.imgur.com/We9WyGL.png")
        .setDescription(
          `[${player.queue.current.title}](${player.queue.current.uri})`
        )
        .addField("`✍﹕Requested by`", `${player.queue.current.requester}`, true)
        .addField(
          "`⏰﹕Duration`",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}]\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return message.channel.send(QueueEmbed);
    }

    let Songs = player.queue.map((t, index) => {
      t.index = index;
      return t;
    });

    let ChunkedSongs = _.chunk(Songs, 10); //How many songs to show per-page

    let Pages = ChunkedSongs.map((Tracks) => {
      let SongsDescription = Tracks.map(
        (t) =>
          `\`${t.index + 1}.\` [${t.title}](${t.uri}) \n\`${prettyMilliseconds(
            t.duration,
            {
              colonNotation: true,
            }
          )}\` **|** Requested by: ${t.requester}\n`
      ).join("\n");

      let Embed = new MessageEmbed()
        .setAuthor("C-Redro : Your Queue List", "https://cdn.discordapp.com/emojis/853350758253330503.png?size=96")
        .setColor("202225")
        .setImage("https://i.imgur.com/AKg3BEO.png")
        .setDescription(
          `**<a:a_bell:873433682298425394>﹕Currently Playing:** \n[${player.queue.current.title}](${player.queue.current.uri}) \n\n**<a:a_treasure:873433681270816798>﹕Up Next:** \n${SongsDescription}\n\n`
        )
        .addField("`🎶Total Songs:` \n", `\`${player.queue.totalSize - 1}\``, true)
        .addField(
          "`⌛Total Length:` \n",
          `\`${prettyMilliseconds(player.queue.duration, {
            colonNotation: true,
          })}\``,
          true
        )
        .addField("`✍Requested by:`", `${player.queue.current.requester}`, true)
        .addField(
          "<a:a_information:873433684986986506>﹕Current song duration:",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());

      return Embed;
    });

    if (!Pages.length || Pages.length === 1)
      return message.channel.send(Pages[0]);
    else client.Pagination(message, Pages);
  },
  SlashCommand: {
    /*
    options: [
      {
          name: "page",
          value: "[page]",
          type: 4,
          required: false,
          description: "Enter the page of the queue you would like to view",
      },
  ],
  */
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "📢・ **Hey, Nothing is playing right now...**");

      if (!player.queue || !player.queue.length || player.queue === 0) {
        let QueueEmbed = new MessageEmbed()
          .setAuthor("C-Redro : Currently playing", "https://cdn.discordapp.com/emojis/853350758253330503.png?size=96")
          .setColor("202225")
          .setImage("https://i.imgur.com/We9WyGL.png")
          .setDescription(
            `[${player.queue.current.title}](${player.queue.current.uri})`
          )
          .addField("`✍﹕Requested by`", `${player.queue.current.requester}`, true)
          .addField(
            "`⏰﹕Duration`",
            `${
              client.ProgressBar(
                player.position,
                player.queue.current.duration,
                15
              ).Bar
            } \`[${prettyMilliseconds(player.position, {
              colonNotation: true,
            })} / ${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}]\``
          )
          .setThumbnail(player.queue.current.displayThumbnail());
        return interaction.send(QueueEmbed);
      }

      let Songs = player.queue.map((t, index) => {
        t.index = index;
        return t;
      });

      let ChunkedSongs = _.chunk(Songs, 10); //How many songs to show per-page

      let Pages = ChunkedSongs.map((Tracks) => {
        let SongsDescription = Tracks.map(
          (t) =>
            `\`${t.index + 1}.\` [${t.title}](${
              t.uri
            }) \n\`${prettyMilliseconds(t.duration, {
              colonNotation: true,
            })}\` **|** Requested by: ${t.requester}\n`
        ).join("\n");

        let Embed = new MessageEmbed()
          .setAuthor("C-Redro : Your Queue List", "https://cdn.discordapp.com/emojis/853350758253330503.png?size=96")
          .setColor("202225")
          .setImage("https://i.imgur.com/AKg3BEO.png")
          .setDescription(
            `**<a:a_bell:873433682298425394>﹕Currently Playing:** \n[${player.queue.current.title}](${player.queue.current.uri}) \n\n**<a:a_treasure:873433681270816798>﹕Up Next:** \n${SongsDescription}\n\n`
          )
          .addField(
            "`🎶Total Songs:` \n",
            `\`${player.queue.totalSize - 1}\``,
            true
          )
          .addField(
            "`⌛Total Length:` \n",
            `\`${prettyMilliseconds(player.queue.duration, {
              colonNotation: true,
            })}\``,
            true
          )
          .addField("`✍Requested by:`", `${player.queue.current.requester}`, true)
          .addField(
            "<a:a_information:873433684986986506>﹕Current song duration:",
            `${
              client.ProgressBar(
                player.position,
                player.queue.current.duration,
                15
              ).Bar
            } \`[${prettyMilliseconds(player.position, {
              colonNotation: true,
            })} / ${prettyMilliseconds(player.queue.current.duration, {
              colonNotation: true,
            })}]\``
          )
          .setThumbnail(player.queue.current.displayThumbnail());

        return Embed;
      });

      if (!Pages.length || Pages.length === 1)
        return interaction.send(Pages[0]);
      else client.Pagination(interaction, Pages);
    },
  },
};

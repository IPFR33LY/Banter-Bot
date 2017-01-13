//
// Copyright (c) 2017 DrSmugleaf
//

"use strict"
const commando = require("discord.js-commando")
const oneLine = require("common-tags").oneLine

module.exports = class Skip extends commando.Command {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["skip"],
      group: "youtube",
      memberName: "skip",
      description: "Skips the currently playing video in this server",
      examples: ["skip"],
      guildOnly: true
    })

    this.votes = {}
  }

  isSameVoiceChannel(msg) {
    return msg.member.voiceChannel &&
      msg.member.voiceChannel == msg.guild.voiceConnection
  }

  async run(msg) {
    if(this.isSameVoiceChannel(msg)) {
      return msg.reply("You arent in the voice channel")
    }

    const voiceConnection = msg.guild.voiceConnection
    const id = msg.guild.id

    if(voiceConnection) {
      this.votes[id] = this.votes[id] ? +1 : 1

      if(this.votes[id] > (voiceConnection.channel.members.size - 1) / 2) {
        var dispatcher = voiceConnection.player.dispatcher
        var repeatList = this.client.registry.resolveCommand("youtube:repeat").repeatList

        if(repeatList[id]) repeatList.delete(msg.guild)
        dispatcher.end()

        return msg.send(oneLine`
          ${this.votes[id]} members voted to skip,
          skipped the current video
        `)
      } else {
        return msg.reply(oneLine`
          ${this.votes[id]} members want to skip
          the current video
        `)
      }
    }
  }
}
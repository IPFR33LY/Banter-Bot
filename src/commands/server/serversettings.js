//
// Copyright (c) 2017 DrSmugleaf
//

"use strict"
const commando = require("discord.js-commando")
const constants = require("../../util/constants")

module.exports = class ServerSettings extends commando.Command {
  constructor(client) {
    super(client, {
      name: "server-settings",
      aliases: [
        "server-settings", "serversettings",
        "guild-settings", "guildsettings"
      ],
      group: "server",
      memberName: "server-settings",
      description: "Modifies this server's settings",
      examples: ["server-settings"],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: "mode",
          prompt: "What do you want to do? (clear, get, remove, set)",
          type: "string",
          validate: (mode) => {
            return ["clear", "get", "remove", "set"].includes(mode)
          }
        },
        {
          key: "key",
          prompt: "What setting key do you want to act on?",
          type: "string",
          default: ""
        },
        {
          key: "value",
          prompt: "What value do you want to set for the key?",
          type: "string",
          default: ""
        }
      ]
    })
  }

  hasPermission(msg) {
    return msg.author.id === this.client.options.owner
  }

  async run(msg, args) {
    const mode = args.mode
    var key = args.key
    var value = args.value
    const guildSettings = msg.guild.settings

    switch (mode) {
    case "clear": {
      guildSettings.clear()
      return msg.reply(constants.responses.SERVER_SETTINGS.CLEAR[msg.language])
    }
    case "get": {
      if(!key) key = await this.args[1].obtainSimple(msg)
      if(!key) return
      const get = guildSettings.get(key)
      return msg.reply(constants.responses.SERVER_SETTINGS.GET[msg.language](key, get))
    }
    case "remove": {
      if(!key) key = await this.args[1].obtainSimple(msg)
      if(!key) return
      guildSettings.remove(key)
      return msg.reply(constants.responses.SERVER_SETTINGS.REMOVE[msg.language](key))
    }
    case "set": {
      if(!key) key = await this.args[1].obtainSimple(msg)
      if(!key) return
      if(!value) value = await this.args[2].obtainSimple(msg)
      if(!value) return
      guildSettings.set(key, value)
      return msg.reply(constants.responses.SERVER_SETTINGS.SET[msg.language](key, value))
    }
    }
  }
}
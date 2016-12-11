//
// Copyright (c) 2016 DrSmugleaf
//

"use strict"
const constants = require("../../util/constants")
const commando = require("discord.js-commando")

module.exports = class Magic8Ball extends commando.Command {
  constructor(client) {
    super(client, {
      name: "magic-ball",
      aliases: ["8", "8ball", "magic8", "magic8ball"],
      group: "misc",
      memberName: "magic8ball",
      description: "An answer from the Magic 8 Ball",
      examples: ["8 will I get an answer?"],
      args: [
        {
          key: "question",
          prompt: "What is your question for the Magic 8 Ball?",
          type: "string",
          default: ""
        }
      ]
    })
  }

  async run(msg) {
    const answer = constants.responses.MAGIC8BALL["english"][Math.floor(Math.random() * constants.responses.MAGIC8BALL["english"].length)]
    return msg.reply(answer)
  }
}

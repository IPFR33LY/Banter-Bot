//
// Copyright (c) 2016 DrSmugleaf
//

"use strict"
const CommandHandler = require("./commandhandler")
const commandhandler = new CommandHandler()
const TranslatorHandler = require("./translatorhandler")
const translatorhandler = new TranslatorHandler()

class MessageHandler {
  constructor() {}
}

MessageHandler.prototype.handleMessage = function(msg) {
  switch(msg.content.charAt(0)) {
  case "!":
  case "+":
  case "-":
    commandhandler.getCommand(msg)
    break
  default:
    translatorhandler.translate(msg, {"general": "es", "serbia": "en"})
    break
  }
}

module.exports = MessageHandler

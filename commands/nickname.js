const CastAPI = require(`castapi`)
const Command = CastAPI.Command
const Discord = require(`discord.js`)

class Nickname extends Command {
  update (message, response, nickname, clearing = false) {
    var targets = message.mentions.members.size === 0 ? [message.member] : message.mentions.members.array()
    var success = {active: false, text: `Successfully ${clearing ? `cleared` : `updated`} the nickname for`}
    var failed = {active: false, text: `Couldn't ${clearing ? `clear` : `update`} nickname(s) for `}
    var count = 0
    var reply = () => response.reply(`${success.active ? success.text : ``}${failed.active ? `${success.active ? `; ` : ``}${failed.text}` : ``}`)
    targets.forEach((target, index) => {
      count++
      target.setNickname(nickname).then(() => {
        success.active = true
        success.text += ` <@${target.id}> `
        if (count === targets.length) return reply()
      }).catch(e => {
        failed.active = true
        failed.text += `<@${target.id}> `
        if (count === targets.length) {
          failed.text += ` because ${e.message.toLowerCase()}`
          return reply()
        }
      })
    })
  }

  execute (message, response, args) {
    if ((args.length === 0) || (message.mentions.members.size === args.length)) return this.update(message, response, '', true)
    var nick = args.join(' ').replace(Discord.MessageMentions.USERS_PATTERN, '').trim()
    this.update(message, response, nick)
  }
}

module.exports = Nickname

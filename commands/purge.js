const CastAPI = require(`castapi`)
const Command = CastAPI.Command

class Purge extends Command {
  execute (message, response, args) {
    var limit = args[0] || 10
    var badArg = () => response.reply('Please enter a valid number from 2 to 99')
    if (isNaN(limit)) return badArg()
    limit = parseInt(limit)
    if (limit < 2 || limit >= 100) return badArg()
    message.channel.fetchMessages({limit}).then(messages => {
      response.reply(`Purging ${limit} messages...`, null, false).then(msg => {
        message.channel.bulkDelete(messages).then(() => {
          msg.edit(`${response.prefix(message.author.id)}: Successfully purged ${limit} messages`).then(() => msg.delete(response.properties.autoRemove * 1000).catch(e => null))
        })
      })
    })
  }
}

module.exports = Purge

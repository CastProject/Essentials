const CastAPI = require(`castapi`);
const Command = CastAPI.Command;

class Nickname extends Command {
  clear(message, response, args) {
    var target = message.mentions.members.size == 0 ? message.member : message.mentions.members.first();
    target.setNickname('').then(() => {
      return response.reply(`Successfully cleared the nickname for <@${target.id}>`)
    })
  }
  
  execute(message, response, args) {
    if ((args.length == 0) || (message.mentions.members.size == args.length)) return this.clear(message, response, args);
    
  }
}

module.exports = Nickname;
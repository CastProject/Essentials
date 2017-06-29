const CastAPI = require(`castapi`);
const Command = CastAPI.Command;

class Mute extends Command {

  mute(role, gMember, expiration = -1) {
    return new Promise((resolve, reject) => {
      gMember.addRole(role).then(member => {
        if (expiration >= 2) setInterval(() => member.removeRole(role), expiration * 1000);
        resolve();
      })
    })
    
  }

  getMuteRole(guild) {
    var mRole = null;
    guild.roles.some(role => {
      if (role.name == this.plugin.muteSettings.name) {
        return !!(mRole = role);
      }
    })
    return mRole;
  }

  execute(message, response, args) {
    if (message.mentions.members < 1) {
      return response.reply('Please specify a user to mute in the first argument.');
    }
    var target = message.mentions.members.first();
    var seconds = isNaN(args[1]) ? -1 : parseInt(args[1]);
    var mRole = this.getMuteRole(message.guild);
    if (!mRole) {
      this.plugin.mutedUpdate([message.guild]);
      mRole = this.getMuteRole(message.guild);
    }
    if (target.roles.get(mRole.id)) {
      target.removeRole(mRole.id).then(() => {
        response.reply(`Successfully unmuted <@${target.id}>`);
      })
    } else {
      this.mute(mRole, target, seconds).then(() => {
        response.reply(`Successfully muted <@${target.id}>${seconds >= 2 ? ` for ${seconds} seconds` : ``}`);
      });
    }
    
  }
}

module.exports = Mute;
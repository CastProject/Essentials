const CastAPI = require(`castapi`);
const EmbedBuilder = CastAPI.EmbedBuilder;
const Command = CastAPI.Command;

const Discord = require(`discord.js`);

class Kick extends Command {
  execute(message, response, args) {
    if (message.mentions.members.size < 1) {
      return response.reply('Please specify at least one user to kick!');
    }
    var kicked = 0, failed = 0;
    var reason = args.join(" ").replace(Discord.MessageMentions.USERS_PATTERN, '').trim();
    var count = 0;
    message.mentions.members.forEach(member => {
      count++;
      this.plugin.createCase(`kick`, message.member.id, member.id, reason).then(() => {
        member.kick().then(() => {
          kicked++;
          member.send(`You have been kicked from *${message.guild.name}*${reason !== '' ? `: **${reason}**` : `.`}`)
        }).catch(e => {
          failed++;
          this.cast.logError(e);
        }).done(() => {
          if (count === message.mentions.members.size) {
            response.reply(`Successfully kicked ${kicked} member${kicked === 1 ? `` : `s`}${failed > 0 ? ` and failed to kick ${failed} member${failed === 1 ? `` : `s`}` : ``}`);
          }
        })
      })
    })
    
  }
}

module.exports = Kick;
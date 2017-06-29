const CastAPI = require('castapi')

const MuteSettings = {
  name: 'Muted',
  color: '#ff0000',
  permissions: ['READ_MESSAGES', 'CONNECT', 'READ_MESSAGE_HISTORY'],
  hoist: false,
  mentionable: false
}

class Essentials extends CastAPI.Plugin {
  constructor (cast, metadata, _path) {
    super(cast, metadata, __dirname)
    this.muteSettings = MuteSettings;
    this.mutedUpdate().then(() => {
      this.log('Essentials plugin was enabled.');
    })
  }

  /**
   * 
   * @param {Guild[]} guilds
   */
  mutedUpdate(guilds = this.cast.client.guilds.array()) {
    return new Promise((resolve, reject) => {
      guilds.forEach(guild => {
        var mRole = null;
        guild.roles.some(role => {
          if (role.name == MuteSettings.name) return !!(mRole = role);
        })
        if (!mRole) {
          guild.createRole(MuteSettings).then(role => {
            this.updateMutePermissions(guild, role);
          });
        } else this.updateMutePermissions(guild, mRole);
        
      });
      resolve();
    });
  }

  updateMutePermissions(guild, role) {
    return new Promise((resolve, reject) => {
      guild.channels.forEach(channel => {
        channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          SPEAK: false
        });
      });
      resolve();
    })
    
  }
}

module.exports = Essentials
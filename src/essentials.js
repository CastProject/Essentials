const CastAPI = require('castapi')

class Essentials extends CastAPI.Plugin {
  constructor (cast, metadata, _path) {
    super(cast, metadata, __dirname)
    this.log('Essentials plugin was enabled.')
  }
}

module.exports = Essentials
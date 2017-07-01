const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CaseSchema = new Schema({
  caseType: {
    type: String,
    required: true
  },
  issuerID: {
    type: String,
    required: true
  },
  issueeID: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  message: String
})

module.exports = mongoose.model('essentials-case', CaseSchema)

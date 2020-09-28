const mongoose = require('mongoose')

const investmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    _companyId: { type: String, required: true },
    _userId: { type: String, required: true },
    numberOfShares: { type: Number, required: true },
    amount: { type: Number, required: true }
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, json) {
        delete json.__v
        delete json.id
        return json
      }
    }
  }
)

module.exports = mongoose.model('Investment', investmentSchema)

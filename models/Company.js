const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    slogan: { type: String, required: true },
    description: { type: String, required: true }
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


module.exports = mongoose.model('Company', companySchema)

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    job: { type: String, required: true },
    email: { type: String, required: true }
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

module.exports = mongoose.model('User', userSchema)

const port = process.env.PORT || 4000
const dbURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/investment-db'

module.exports={port, dbURI}
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Investment = require('../models/Investment')
const User = require('../models/User')
const Company = require('../models/Company')
const investmentsData = require('./data/investmentsData')
const usersData = require('./data/usersData')
const companiesData = require('./data/companiesData')
const { dbURI } = require('../config/environment')

mongoose
  .connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Investment.create(investmentsData))
  .then(() => User.create(usersData))
  .then(() => Company.create(companiesData))
  .then(() => console.log('Succesfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())

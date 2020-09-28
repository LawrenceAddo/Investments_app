const User = require('../models/User')

function indexRoute(req, res, next) {
  User.find(req.query)
    .then((users) => res.json(users))
    .catch(next)
}

function showRoute(req, res, next) {
  User.findById(req.params.id) // get the station from the database:MONGOOSE
    .then((user) => {
      if (!user) return res.sendStatus(404) //404 means not found

      return res.json(user) //send it to JSON:EXPRESS
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}

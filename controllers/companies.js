const Company = require('../models/Company')

function indexRoute(req, res, next) {
  Company.find(req.query)
    .then((companies) => res.json(companies))
    .catch(next)
}

function showRoute(req, res, next) {
  Company.findById(req.params.id) // get the station from the database:MONGOOSE
    .then((company) => {
      if (!company) return res.sendStatus(404) //404 means not found

      return res.json(company) //send it to JSON:EXPRESS
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}

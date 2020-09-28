const investment = require('../models/Investment')

function indexRoute(req, res, next) {
  investment
    .find(req.query)
    .then((investments) => res.json(investments))
    .catch(next)
}

function showRoute(req, res, next) {
  investment
    .find({_userId: req.params.id})
    .then((investment) => {
      if (!investment) return res.sendStatus(404)
      return res.json(investment)
    })
    .catch(next)
}



module.exports = {
  index: indexRoute,
  show: showRoute

}

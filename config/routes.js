const router = require('express').Router()
const companies = require('../controllers/companies')
const investments = require('../controllers/investments')
const users = require('../controllers/users')

router.route('/investments').get(investments.index)
router.route('/users').get(users.index)
router.route('/companies').get(companies.index)

router.route('/investments/:id').get(investments.show)
router.route('/users?').get(users.show)
router.route('/companies/:id').get(companies.show)

module.exports = router

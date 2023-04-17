const express =  require('express')
const routesAuth = express.Router()

const authControllers = require('../controllers/authcontroller')
const authController = new authControllers()


routesAuth.post('/register', authController.register)
routesAuth.post('/login', authController.login)


module.exports = { routesAuth }
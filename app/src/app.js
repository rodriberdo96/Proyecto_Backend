const express = require('express')
const session = require('express-session')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()


const { routesProducts } = require('./routes/productsRoutes')
const { routesCart} = require('./routes/cartRoutes')
const { routesAuth } = require('./routes/authRoutes')
const { routesChat } = require('./routes/chatRoutes')
const { routesOrder } = require('./routes/orderRoutes')


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));


app.use('/auth', routesAuth)
app.use('/products', routesProducts)
app.use('/cart', routesCart)
app.use('/chat', routesChat)
app.use('/orders', routesOrder)


mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true })

app.all('*', (req, res) => {
    res.status(404).json({
        error: -2 , 
        descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no implementada`
    })
})
    
module.exports = app
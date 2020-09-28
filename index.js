const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { port, dbURI } = require('./config/environment')
const router = require('./config/routes')
mongoose
  .connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connect!!'))
  .catch((err) => console.log(err))

app.use('/api', router)

app.listen(port, () => console.log(`Port is up and running on ${port}`))

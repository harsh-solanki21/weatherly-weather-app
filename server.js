const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { data: '' })
})

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : 'Mumbai'
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    location +
    '&appid=' +
    process.env.APPID +
    '&units=metric'
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on('data', (data) => {
        const weatherData = JSON.parse(data)
        res.render('index', { data: weatherData })
      })
    } else {
      res.render('index', { data: '0' })
    }
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on ${port}`)
})

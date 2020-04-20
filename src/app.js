const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:  'Weather app',
        name: "Thibaut Dumontet"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:  'About page',
        img: "/img/image.jpeg",
        name: "Thibaut Dumontet"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:  'Help Page',
        name: 'Thibaut Dumontet',
        helpMsg: "Just click on my picture"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an adress'
        })
    }

    geocode(req.query.address, (error, {latitude, longitute, location} = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast(latitude, longitute, (error, {temperature, precipProbability, currentSummary, minutelySummary} = {}) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                temperature,
                precipProbability,
                now: currentSummary,
                forecast: minutelySummary,
                address : req.query.address})
        })
    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a seach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
})
})

app.get('*', (req, res) => {
    res.render('404', {
        urlName: req.originalUrl
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
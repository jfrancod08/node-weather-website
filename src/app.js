const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jean Franco'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jean Franco'

    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Jean Franco',
        helpText: 'This is some helpful text'
    
    })

})

app.get('/weather',(req, res) => {
const address = req.query.address
    
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
     } else {
            geoCode(address, (error, {longitude, latitude, location} = {}) => {
                if(error) {
                    return res.send({ error })
                }
                forecast(longitude,latitude, (error, forecastData) =>{
                    if (error) {
                        return res.send({ error })                
                    }
                    return res.send({
                        location,
                        forecast: forecastData,
                        address: req.query.address
                    })
                })
            })
        }
    })

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })    
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Help Article not found.'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Page not found'

    })

})


app.listen(3000, () => {
    console.log('Server is up on port 3000')

})
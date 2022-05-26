const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manish',
        footer: 'All Rights are reserved'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'This is a help page',
        footer: 'All Rights are reserved'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Manish',
        footer: 'All Rights are reserved'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({error})}

            res.send({
                forecast: forcastData,
                location: location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: "It is raining",
    //     location: "Bangalore",
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('generic404', {
        title: 'About',
        name: 'Manish',
        footer: 'All Rights are reserved',
        errorMessage: 'Title not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'About',
        name: 'Manish',
        footer: 'All Rights are reserved',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is listening on 3000')
})
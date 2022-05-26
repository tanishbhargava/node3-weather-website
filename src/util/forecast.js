const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec22b55bfd4fe37fa2afc60a76d45ee6&query=' + long + ',' + lat

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error === 0){
            callback('Unable to find weather. Try another search.', undefined)
        } else {
            const data = body.current
            callback(undefined, "The current temprature " + data.temperature + " but it feels like " + data.feelslike)
        }
            
    })
}

module.exports = forecast

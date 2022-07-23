const request = require("postman-request")

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0062eef6e8abc47aa3cf43fb28c0502&query=' + longitude + ',' + latitude + '&units=m'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity level is ' + body.current.humidity)
        }
    })

}

module.exports = forecast
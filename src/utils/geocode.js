const request = require('postman-request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamZyYW5jb2QiLCJhIjoiY2w1dDJoYmFwMjJ5YzNqbW42anA4dmhseiJ9.Xmee48PKQ-d9Z3xQ5sbS2A&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }  else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude:body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
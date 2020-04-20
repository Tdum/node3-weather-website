const request = require('request')
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGR1bSIsImEiOiJjazgzYWp6NXkweHRiM2htczYzZnNqeDAxIn0.RcayyXpFPEcXmW88UiiuWw&limit=1'

    request({ url, json: true}, (error, { body: { features } = {}} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0){
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitute: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode
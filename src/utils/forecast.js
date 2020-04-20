const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e6b039461432cf2079e16ebb32001cfa/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body: {error: responseErrorMsg, currently: {temperature, precipProbability, summary:currentSummary}, minutely : { summary:minutelySummary } = {} }}) => {
        if (error) {
            callback(error, undefined)
        } else if (responseErrorMsg) {
            callback(responseErrorMsg, undefined)
        } else {
            callback(undefined, {
                temperature,
                precipProbability,
                currentSummary,
                minutelySummary
            })
        }
    })
}

module.exports = forecast
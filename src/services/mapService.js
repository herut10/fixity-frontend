'use strict';

export default {
    convertCoordsToAddress
}

function convertCoordsToAddress(coords) {
    var geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({
            location: coords
        }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0].formatted_address)
                } else {
                    reject()
                }
            } else {
                reject()
            }
        })
    })
}
'use strict';

function getDistanceFromLatLngInKm(loc1, loc2) {
    var R = 6371; // Radius of the earth in km
    var lat1 = loc1.lat;
    var lng1 = loc1.lng;
    var lat2 = loc2.lat;
    var lng2 = loc2.lng;
    var dLat = deg2rad(lat2 - lat1);
    var dLng = deg2rad(lng2 - lng1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export default {
    getDistanceFromLatLngInKm
}
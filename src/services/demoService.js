'use strict';

var appThis = '';

var demoIssues = [
    {
        title: 'Trash everywhere',
        address: 'Khisin St 5, Tel Aviv-Yafo, Israel',
        loc: { lat: 32.07430195860547, lng: 34.77666020049878 },
        desc: 'someone threw their trash all over the pavement!',
        category: 'garbage',
        status: 'open',
        imgUrls: ['https://res.cloudinary.com/djewvb6ty/image/upload/v1533383305/sidewalk_covered.jpg'],
        nonIssueReportCount: 0,
        likes: {
            likeHappy: 0,
            likeSad: 0,
            likeAngry: 0,
            likeShocked: 0,
            likeDisgusted: 0
        },
        reportedBy: '5b62f8cff0dc685b3c0fcb9e'
    },
    {
        title: 'stop sign covered by tree',
        address: 'HaPelech St 1, Tel Aviv-Yafo, Israel',
        loc: { lat: 32.050588576771375, lng: 34.765668227355036 },
        desc: 'be careful guyssss',
        category: 'pedestrian',
        status: 'open',
        imgUrls: ['https://res.cloudinary.com/djewvb6ty/image/upload/v1533394603/stop_sign_covered.png'],
        nonIssueReportCount: 0,
        likes: {
            likeHappy: 0,
            likeSad: 0,
            likeAngry: 0,
            likeShocked: 0,
            likeDisgusted: 0
        },
        reportedBy: '5b62f8cff0dc685b3c0fcb9e'
    }
]

var demoComments = [
    {
        comment: {
            issueId: '',
            commenterId: '',
            txt: '',
            createdAt: Date.now()
        },
        commenter: {}
    },
    {
        comment: {
            issueId: '',
            commenterId: '',
            txt: '',
            createdAt: Date.now()
        },
        commenter: {}
    }
]

// this.$socket.emit('commentSent', comment);

function setThis(component) {
    appThis = component;
}

function _getFunc(x) {
    return function () {
        appThis.$socket.emit('issueAdd', demoIssues[x]);
    }
}

function addRandomIssue() {
    for (let i = 0; i < demoIssues.length; i++) {
        setTimeout(_getFunc(i), 5000 + (5000 * i));
    }
}

export default {
    setThis,
    addRandomIssue
}
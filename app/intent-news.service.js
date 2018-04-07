"use strict";

const http = require("request-promise-native");

exports.fulfill = function (sendResponse) {
    const url = 'http://www.kreamont.at/wp-json/wp/v2/posts?per_page=1';
    http.get({ json: true, uri: url }).then(function (news) {
        let text = undefined
        if (news.length <= 0) {
            sendResponse('Leider hab ich keine Neuigkeiten gefunden');
        }
        let info = news[0];
        let result = {
            fulfillmentMessages: [{
                platform: 'ACTIONS_ON_GOOGLE',
                text: {
                    text: [info.title.rendered]
                }
            },
            {
                platform: 'ACTIONS_ON_GOOGLE',
                linkOutSuggestion: {
                    destinationName: 'Zum Artikel',
                    uri: info.link
                }
            }]
        };
        sendResponse(result);
    });
};
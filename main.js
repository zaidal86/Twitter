var request = require('request');
const fs = require('fs');
const app = require('./dashboard/server.js');
const { token } = require('./config.json');
let user = {};
let date = {};
let message = {};

var options = {
    'method': 'GET',
    'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Zaidal86&count=300&exclude_replies=true&include_rts=false',
    'headers': {
        'Authorization': 'Bearer ' + token,
        'Cookie': 'guest_id=v1%3A161855156611978309; personalization_id="v1_DjYOl4uz4w/gYTB1kQtTvA=="'
    }
};
function tweeter() {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let json = JSON.parse(response.body);
        for (i = 0; i < 4; i++) {
            try {

                user[i] = json[i].user.name;
                date[i] = json[i].created_at;
                message[i] = json[i].text;

                let data = {
                    "tweet": [{
                        "date": date[0], "user": user[0], "message": message[0]
                    }, {
                        "date": date[1], "user": user[1], "message": message[1]
                    }, {
                        "date": date[2], "user": user[2], "message": message[2]
                    }, {
                        "date": date[3], "user": user[3], "message": message[3]
                    }]
                }

                let dataStringified = JSON.stringify(data);
                fs.writeFileSync('./dashboard/views/data.json', dataStringified);

            } catch (e) {
                console.log('Error' + e);
            };
        };
    });
    setTimeout(tweeter, 1 * 1000);
};
tweeter();
var express = require('express');
var path = require('path');
var moment = require('moment');

var server = express();

var port = process.env.PORT || 8000;

server.use(express.static(__dirname + '/public'));

// Serve a static index page if no params are provided
server.get('/', function(req, res) {
    res.sendFile('index.html', function(err){
        if(err) {
            console.log(err.status);
        }
    });
});

server.get('/:date', function(req,res) {
    var date = req.params.date;
    var myDate;

    // Check if date a number greater than 0
    if(parseInt(date) > 0) {
        myDate = moment.unix(date);
    } else {
        myDate = moment(date, "MMMM DD, YYYY");
    }

    // Use moment.js isValid function to check if the date is valid
    if(myDate.isValid()) {
        res.json({
            unix: myDate.format("X"),
            natural: myDate.format("MMMM DD, YYYY")
        });
    } else {
        res.json({
            unix: null,
            natural: null
        });
    }
});

// Listen on the provided port
server.listen(port, function () {
    console.log('Listening on port ' + port)
});

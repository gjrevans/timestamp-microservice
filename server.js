var express = require('express');
var path = require('path');
var moment = require('moment');

var server = express();

var port = process.env.PORT || 8000;

// Listen on the provided port
server.listen(port, function () {
  console.log('Listening on port ' + port)
})

// Serve a static index page if no params are provided
server.get('/', function(req, res) {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function(err){
        if(err) {
            res.writeHead(err.status);
            res.end();
        }
    });
});

server.get('/:date', function (req, res) {
    var date = req.params.date;

    // Try to parse the date as a natural data value
    var newDate = moment(date, "MMMM DD, YYYY");

    // Then if date is invalid, try to parse as unix
    if(!newDate.isValid()){
        newDate = moment.unix(date);
    }

    // If the date is now valid, send it back, otherwise return null object
    if(newDate.isValid()){
        res.json({
            unix: newDate.format("X"),
            natural: newDate.format("MMMM D, YYYY")
        });
    }

    res.json({
        unix: null,
        natural: null
    });
});

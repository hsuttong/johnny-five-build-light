// index.js
var five = require("johnny-five");
var board = new five.Board();

var rgb;

board.on("ready", function() {
  // Create an RGB LED ([RedPin, GreenPin, BluePin])
  rgb = new five.Led.RGB([11,10,9]);

  // Set the color, and switch between on/off every 500ms
  // rgb.color("#f4f90b");
  // rgb.strobe(500);
});

var http = require("http");

var server = http.createServer(function(req, resp) {
  var url = req.url.toLowerCase();
  if (url.indexOf("/events/build/started") == 0) {
    resp.end("Build Started");
  } else if (url.indexOf("/events/build/success") == 0) {
    resp.end("Build Successful");
  } else if (url.indexOf("/events/build/failure") == 0) {
    resp.end("Build Failed");
  } else {
    resp.end("Unknown event");
  }
}).listen(8000);
console.log("Server listening on: http://localhost:8000");

var server = http.createServer(function(req, resp) {
  if (!rgb) {
    resp.end("No board found...");
    return;
  }

  var url = req.url.toLowerCase();
  if (url.indexOf("/events/build/started") == 0) {
    rgb.color("#FFFF00");
    resp.end("Build Started");
  } else if (url.indexOf("/events/build/success") == 0) {
    rgb.color("#00FF00");
    resp.end("Build Successful");
  }
  // ...
});

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var trafficCalculator = require("./traffic_calculator");

content = document.getElementById('content')

trafficCalculator.getCrossTime()
  .then(result => {
    result.forEach(function(routeInfo){
      console.log(routeInfo)
      console.log(content)
      content.innerHTML += "<div class='col'>"+routeInfo.name+"<br/>"+Math.round(routeInfo.time)+" minutes</div>"
    });
  })
  .catch(error => {
    console.log('error')
  });


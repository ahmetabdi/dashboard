var qs = require("querystring");
var request = require("request");

const getCrossTime = function() {
  return new Promise((resolve, reject) => {
    var form = {
      "from"              : "x:-0.5705088 y:51.2363954",
      "to"                : "x:-0.252942 y:51.387645",
      "at"                : 0,
      "returnJSON"        : "true",
      "returnGeometries"  : "true",
      "returnInstructions": "true",
      "timeout"           : 60000,
      "nPaths"            : 3,
      "clientVersion"     : "4.0.0",
      "options"           : "AVOID_TRAILS:t,ALLOW_UTURNS:t"
    };

    var url = "https://www.waze.com/row-RoutingManager/routingRequest?" + qs.stringify(form);

    var options = {
      url: url,
      headers: {
        'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.22 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    request.get(options, (err, response, body) => {
      if (err) {
        reject(err)
        // return res.status(500).send(err);
      }
      // if (response.statusCode != 200) return res.status(500).send(body);

      var data = JSON.parse(body);

      if (data.alternatives && data.alternatives.length > 0) {
        var result = data.alternatives.map(nice);
        resolve(result)
        // res.json(result);
        // console.log(result)
      }
    });

    function nice(route) {
      var chemin = route.response;
      var cout = chemin.results.reduce((prev, current) => {
        prev.time += current.crossTime / 60; // to minutes
        prev.dist += current.length * 0.000621371; // to miles
        return prev;
      }, { time: 0, dist: 0 });

      return {
        name: chemin.routeName,
        time: cout.time,
        dist: cout.dist
      };
    }
  })
}

exports.getCrossTime = getCrossTime;

var express = require('express');
var router = express.Router();
var YSlow = require('yslowjs');

// middleware to use for all requests
router.use('/', function(req, res, next) {
  console.log("yo!");
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    yo: "Hello World!"
  });
});

router.get('/load-time', function(req, res) {
  var url = req.query.url;

  var yslow = new YSlow(url, [ '--info', 'basic' ]);

  console.log('\nRunning (Async)....');

  yslow.run( function (error, result) {
    if (error) {
      res.send(error);
    } else {
      res.json({
        overal: result.o,
        loadTime: result.lt
      });

      console.log('=> overall:   ' + result.o);
      console.log('=> load time: ' + result.lt);
    }
  });
});

module.exports = router;

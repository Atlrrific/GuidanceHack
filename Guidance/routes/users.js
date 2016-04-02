var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var triggerSchema = mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }

});

triggerSchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
var trigger = mongoose.model('trigger', triggerSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {

  var silence = new trigger({ name: 'TEST' });

  // console.log(silence.speak());

  silence.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
    res.render('index', { title: 'Guidance HARDHACK', status: ' Guiding You' });

  });


});


/* GET users listing. */
router.get('/reset', function(req, res, next) {


  // console.log(silence.speak());
  trigger.remove({ name: 'TEST' }, function (err) {
  if (err) return handleError(err);
  res.render('index', { title: 'Guidance HARDHACK', status: ' Waiting for Guidance' });
  });

});

router.get('/test', function(req, res, next) {
  trigger.find(function (err, kittens) {
  if (err) return console.error(err);
  res.send(kittens);

  console.log(kittens);
  })
});

module.exports = router;

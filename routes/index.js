var express = require('express');
var router = express.Router();

var questions = require('../database/questions.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    var question = {};
    var keys = Object.keys(questions);
    //var category = keys[Math.floor(Math.random() * keys.length)];
    var category = "Corporate Finance"
    var qList = questions[category];
    var question = qList[Math.floor(Math.random() * qList.length)];
    //var question = qList[qList.length - 1];
  res.render('index', { category: category, "question": question["question"], "answer": question["answer"].join('\n')});
});

router.get('/bootstrap', function(req, res, next) {
    res.render('bootstrap');
});



module.exports = router;

var express = require('express');
var router = express.Router();

var questions = require('../database/questions.json');


var structure = [
    [
        "Alternative investment",
        "Private RE investments",
        "PE Valuation",
        "Commodity Investing"

    ]
];


router.get('/:chapterId/:studySessionId/:debugOption', function (req, res, next) {
    var chapterId      = req.params.chapterId;
    var studySessionId = req.params.studySessionId;
    var debugOption    = req.params.debugOption;

    var chapter        = structure[chapterId][0];
    var studySession   = structure[chapterId][studySessionId];

    var categoryJSON    = questions[chapter];
    var subcategoryJSON = categoryJSON[studySession];

    var question;

    if (parseInt(debugOption)) {
        question = subcategoryJSON[subcategoryJSON.length - 1];
    } else {
        question = subcategoryJSON[Math.floor(Math.random() * subcategoryJSON.length)];
    }

    res.render('index', {
        category: chapter,
        "question": question["question"],
        "answer": question["answer"].join('\n')
    });
});

router.get('/bootstrap', function (req, res, next) {
    res.render('bootstrap');
});


module.exports = router;

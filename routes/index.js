var express = require('express');
var router = express.Router();

var questions = require('../database/questions.json');


var structure = [
    [
        "Alternative investment",
        "Private RE investments",
        "Publicly Traded RE Securities",
        "PE Valuation",
        "Commodity Investing"
    ],
    [
        "Fixed Income",
        "Term Structure"
    ]
];

k = 0

router.get('/:chapterId/:studySessionId/:debugOption/:question', function (req, res, next) {
    var chapterId      = req.params.chapterId;
    var studySessionId = req.params.studySessionId;
    var debugOption    = req.params.debugOption;
    var questionID    = req.params.question;

    var chapter        = structure[chapterId][0];
    var studySession   = structure[chapterId][studySessionId];

    var categoryJSON    = questions[chapter];
    var subcategoryJSON = categoryJSON[studySession];

    var question;


    var questionNumber;

    if (parseInt(debugOption) == 2) {
        questionNumber = questionID;
    } else if (parseInt(debugOption) == 1) {
        questionNumber = subcategoryJSON.length - 1;
    } else if (parseInt(debugOption) == 0) {
        questionNumber = Math.floor(Math.random() * subcategoryJSON.length);
    } else {
        questionNumber = (k++) % (subcategoryJSON.length);
    }

    question = subcategoryJSON[questionNumber];

    res.render('index', {
        category: chapter,
        studySession: studySession,
        number : questionNumber,
        all: subcategoryJSON.length - 1,
        "question": question["question"],
        "answer": question["answer"].join('\n')
    });
});

router.get('/bootstrap', function (req, res, next) {
    res.render('bootstrap');
});


module.exports = router;

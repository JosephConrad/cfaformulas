var express = require('express');
var router = express.Router();

var questions = require('../database/questions.json');

var structure = [
    [
        "Quantitative Methods",
        "Correlation and Regression",
        "Multiple Regression",
        "Time Series Analysis"
    ],
    [
        "Economics",
        "Currency Exchange Rate",
        "Economic Growth",
        "Economic of Regulation"
    ],
    [
        "Financial Reporting",
        "Inventories",
        "Long-lived assets",
        "Intercorporate investments",
        "Employee Compensation",
        "Multinational Operations",
        "Quality of FR",
        "Integration techniques"
    ],
    [
        "Alternative investment",
        "Private RE investments",
        "Publicly Traded RE Securities",
        "PE Valuation",
        "Commodity Investing"
    ],
    [
        "Fixed Income",
        "Term Structure",
        'Arbitrage Free Valuation',
        "Embedded Options"
    ]
];

k = 0

router.get('/solution-one', function(req, res) {
    var countries =
        [
            {"name": "China", "population": 1366450000},
            {"name": "India", "population": 1248610000},
            {"name": "USA", "population": 318651000},
            {"name": "Indonesia", "population": 252164800},
            {"name": "Brasil", "population": 203073000},
            {"name": "Pakistan", "population": 188020000},
            {"name": "Nigeria", "population": 178517000}
        ]

    console.log(countries);
    res.send(countries)
});


router.get('/test/:chapterId/:studySessionId', function (req, res, next) {
    var chapterId      = req.params.chapterId;
    var studySessionId = req.params.studySessionId;

    var chapter        = structure[chapterId][0];
    var studySession   = structure[chapterId][studySessionId];

    var categoryJSON    = questions[chapter];
    var subcategoryJSON = categoryJSON[studySession];

    console.log(subcategoryJSON);

    res.send(subcategoryJSON);
});

router.get('/:chapterId/:studySessionId/', function (req, res, next) {
    res.render('index');
});

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

router.get('/bootstrap', function (req, res) {
    res.render('bootstrap');
});


router.get('/bootstrap', function (req, res, next) {
    res.render('bootstrap');
});


module.exports = router;

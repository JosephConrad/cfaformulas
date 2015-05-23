var express = require('express');
var router = express.Router();

var questions = {
    //"ethics"       : {},
    "Quantitative" : [
        {"question" : "Formula for correlation",
         "answer"   : "$$ r_{XY} = \\frac{cov_{XY}}{(s_X)(s_Y)} $$"
        }
    ],
    "Economics"    : [
        {"question" : "Taylor rule",
         "answer"   : "$$policy_{rate} = r_n + \\pi + \\alpha(\\pi - \\pi^*) + \\beta(y-y*) $$"
        }
    ],
    "CorporateFin" : [
        {"question" : "Calculation of residual inscome:",
         "answer"   : "$$ RI_{t} = NI_{t} - r_e B_{t-1}  $$"
        }
    ]
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var question = {};
    var keys = Object.keys(questions);
    var category = keys[Math.floor(Math.random() * keys.length)];
    var qList = questions[category];
    var question = qList[Math.floor(Math.random() * qList.length)];
  res.render('index', { category: category, "question": question["question"], "answer": question["answer"]});
});

router.get('/bootstrap', function(req, res, next) {
    res.render('bootstrap');
});



module.exports = router;

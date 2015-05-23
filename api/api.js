var express = require('express');
var router = express.Router();



router.get('/formula', function(req, res) {
    //var line = linesKeys[Math.floor(Math.random() * linesKeys.length)];
    //var directions = lines[line];
    //var station = Object.keys(directions)[0];
    var question = {};

    question["question"] = "Formula for correlation";
    question["answer"]   = "$$r_{XY} = \frac{cov_{XY}}{(s_X)(s_Y)}$$";
    res.send({"result": {"question": question["question"], "answer": question["answer"]}});
});



module.exports = router;

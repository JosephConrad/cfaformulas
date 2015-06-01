var countryApp = angular.module('countryApp', [])

countryApp.directive("mathjaxBind", function () {
    return {
        restrict: "A",
        scope: {
            text: "@mathjaxBind"
        },
        controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
            $scope.$watch('text', function (value) {
                //                console.log(value);
                var $script = angular.element("<script type='math/tex'>")
                    .html(value == undefined ? "" : value);
                $element.html("");
                $element.append($script);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});

countryApp.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        controller: ["$scope", "$element", "$attrs", function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                if (html != null) {
                    html = html.replace(/\$\$([^$]+)\$\$/g, "<span class=\"inline\" mathjax-bind=\"$1\"></span>");
                    html = html.replace(/\$([^$]+)\$/g, "<span class=\"equation\" mathjax-bind=\"$1\"></span>");
                    ele.html(html);
                    $compile(ele.contents())(scope);
                }
            });
        }]
    };
});


countryApp.controller('MyCtrl', function ($scope, $element) {
    $scope.html = ["$$ \\frac{4}{4}$$"].join('\n');
});


function nextZero(index, tab){
    var i = (index + 1) % (tab.length + 1)

    while (i != index) {
        console.log(i);
        if (tab[i] == 0) return i;
        i = (i + 1) % (tab.length + 1)
    }
    return index;
}

countryApp.controller('testQuestions', function ($scope, $rootScope, $http, $location) {
    $scope.category = "Alternative Investment";
    $scope.studySession = "Publicly Traded RE Securities";
    $scope.questionNumber = 0;
    $scope.questionIndex = 0;

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
    console.log($location);

    var absoluteUrl = $location.absUrl().split('/');
    console.log('http://localhost:3001/test/'+absoluteUrl[3]+'/' + absoluteUrl[4]);

    $scope.chapter = absoluteUrl[3];
    $scope.chapterName  =structure[$scope.chapter][0];
    $scope.session = absoluteUrl[4];
    $scope.sessionName = structure[$scope.chapter][$scope.session];

    $http.get('http://localhost:3001/test/'+$scope.chapter+'/' + $scope.session).success(function (data) {

        console.log(data);
        $rootScope.questions = data;

        $scope.questionsLength = data.length;
        $scope.questionIndex = data.length - 1;
        $scope.shift = 0;
        $scope.toLearn  = [];

        for(var i = 0; i < $scope.questionsLength; i++) {
            $scope.toLearn.push(0);
        }

        $scope.remove = function(index) {
            $scope.toLearn[index] = 1;
        }

        console.log(data[0]);
        $scope.q = data[$scope.questionIndex]["question"];
        $scope.a = data[$scope.questionIndex]["answer"].join('\n');
        $rootScope.actions = {
            "showAnswer": function () {
                $("#buttonLink").text('Not OK');
                $scope.actionLabel = "Not OK";

                $scope.showOK = true;
                $scope.action = $rootScope.actions["nextQuestion"];
                $scope.a = $rootScope.questions[$scope.questionIndex]["answer"].join('\n');
                var box = $("#answerField");
                box.css("visibility", "visible");
            },
            "nextQuestion": function () {
                $("#buttonLink").text('Show answer');
                $scope.actionLabel = "showAnswer";
                $scope.showOK = false;
                $scope.questionIndex = nextZero($scope.questionIndex, $scope.toLearn);
                console.log($scope.questionIndex);
                $scope.q = $rootScope.questions[$scope.questionIndex]["question"];
                $scope.action = $rootScope.actions["showAnswer"];
                var box = $("#answerField");
                box.css("visibility", "hidden");
            }
        };

        $scope.action = $rootScope.actions["showAnswer"];
        $scope.actionLabel = "showAnswer";
        $scope.showOK = false;


    });
    $scope.nextQuestion = function () {
        $scope.msg = 'clicked';
    }
});

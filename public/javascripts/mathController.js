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

countryApp.controller('testQuestions', function ($scope, $rootScope, $http, $location) {
    $scope.category = "Alternative Investment";
    $scope.studySession = "Publicly Traded RE Securities";
    $scope.questionNumber = 0;

    console.log($location);

    var absoluteUrl = $location.absUrl().split('/');
    console.log('http://localhost:3001/test/'+absoluteUrl[3]+'/' + absoluteUrl[4]);

    $http.get('http://localhost:3001/test/'+absoluteUrl[3]+'/' + absoluteUrl[4]).success(function (data) {

        console.log(data);
        $rootScope.questions = data;

        $scope.questionsLength = data.length;

        $scope.toLearn  = [];

        for(var i = 0; i < $scope.questionsLength; i++) {
            $scope.toLearn.push(i);
        }

        $scope.remove = function(item) {
            var index = $scope.toLearn.indexOf(item);
            $scope.toLearn.splice(index, 1);
        }

        console.log(data[0]);
        $scope.q = data[0]["question"];
        $scope.a = data[0]["answer"].join('\n');
        $scope.actionLabel = "showAnswer";
        $rootScope.actions = {
            "showAnswer": function () {
                $("#buttonLink").text('Next question');
                $scope.actionLabel = "nextQuestion";
                $scope.action = $rootScope.actions["nextQuestion"];
                $scope.q = $rootScope.questions[$scope.questionNumber]["question"];
                $scope.a = $rootScope.questions[$scope.questionNumber]["answer"].join('\n');
                var box = $("#answerField");
                box.css("visibility", "visible");
            },
            "nextQuestion": function () {
                $("#buttonLink").text('Show answer');
                $scope.actionLabel = "showAnswer";
                $scope.questionNumber =  $scope.toLearn[($scope.toLearn.indexOf($scope.questionNumber)  + 1)  % ($scope.toLearn.length)];
                $scope.action = $rootScope.actions["showAnswer"];
                var box = $("#answerField");
                box.css("visibility", "hidden");
            }
        };

        $scope.action = $rootScope.actions["showAnswer"];


    });
    $scope.nextQuestion = function () {
        $scope.msg = 'clicked';
    }
});

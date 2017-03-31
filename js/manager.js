var element = {
  id: null,
  level: null,
  task: null,
  kapacitet: null,
  drinkKapacitet: null,
  barFillIgram: null,
  barFillPijem: null
};
var copyBtn = document.getElementById('copyBtn');

var versionToLoad = ['data/datahome.json','data/datastreet.json?'];
var vers=true;
var arr=[];


var app = angular.module('drinkManager',[]);

app.controller('drinkController',function($scope, $window){
  $scope.element = $window.element;

  $scope.calculate = function(a,b) {
    var x = a/b;
    var y = 100/x;
    return y;
  }
  $scope.parseValues = function(value) {
    switch (value) {
      case 'id': $scope.element.id = parseInt($scope.element.id); break;
      case 'level': $scope.element.level = parseInt($scope.element.level); break;
      case 'kapacitet': $scope.element.kapacitet = parseInt($scope.element.kapacitet); break;
      case 'drkapacitet': $scope.element.drinkKapacitet = parseInt($scope.element.drinkKapacitet); break;
      case 'bfIgram': $scope.element.barFillIgram = $scope.calculate($scope.element.level*10+10,$scope.element.kapacitet); break;
      case 'bfPijem': $scope.element.barFillPijem = $scope.calculate($scope.element.level*10+10,$scope.element.drinkKapacitet); break;
    }
  };
});

app.factory('allFactory',function($http,$window){
  function getData() {
    if($window.vers===true) {
      return $http.get(versionToLoad[0]);
    }
    else return $http.get(versionToLoad[1]);
  }

  return {
    getData: getData
  };
});

app.controller('allPageCtrl',function($scope,allFactory,$window) {
  $scope.data;
  $scope.show;
  $scope.searched = {};
  $scope.elToShow=0; //koji element da prikaze
  $('#homeVers').click(function(){
    $window.vers = true;
    getIt();
    document.getElementById('currentVersionInBox').innerHTML = "HOME";
  });

  $('#streetVers').click(function(){
    $window.vers = false;
    getIt();
    document.getElementById('currentVersionInBox').innerHTML = "STREET";
  });

  $('#searchBtn').click(function(){
    var searchlvl = document.getElementById('searchLevel').value;
    var searchtask = document.getElementById('searchTask').value;
    var searchkap = document.getElementById('searchKapacitet').value;
    search(searchlvl,searchtask,searchkap);
    //ovde pozivam search
  });

  $('#clearFields').click(function() {
    document.getElementById('searchLevel').value = "";
    document.getElementById('searchTask').value = "";
    document.getElementById('searchKapacitet').value = "";
  });

  var getIt = function()
  {
    allFactory.getData().success(function(factdata) {
    $scope.data = factdata;
    $scope.elToShow = 0;
    $scope.show = [$scope.data,$window.arr[1]];
    $window.arr = $scope.show;

    //TODO: napraviti sopstveni highlighting

    }).error(function(error){
      console.log(error);
    });
  };

  var search = function(lvl,task,kap) {
      arr[1] = {};
      var searchedLvl = parseInt(lvl);
      var searchedKap = parseInt(kap);

      //SAMO ZA LEVEL --RADI
      if (lvl !== "" && task ==="" && kap ==="") {
        for (var i = 0; i < arr[0].length; i++) {
            if(arr[0][i].level == searchedLvl) {
              arr[1][i] = arr[0][i];
            }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING ONLY FOR LEVEL: "+"<span class='plav'>"+lvl+"</span>";
      }

      //SAMO ZA TASK --RADI
      if (lvl === "" && task !=="" && kap ==="") {
        var splitted = task.split(';');

        for (i = 0; i < arr[0].length; i++) {
          for (var j = 0; j < splitted.length; j++) {
            if(arr[0][i].task.toLowerCase().indexOf(splitted[j])>=0) {
              arr[1][i] = arr[0][i];
            }
          }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING ONLY FOR TASK KEYWORDS: "+"<span class='plav'>"+splitted+"</span>";
      }

      //SAMO ZA KAPACITET --RADI
      if (lvl === "" && task ==="" && kap !=="") {
        for (var i = 0; i < arr[0].length; i++) {
            if(arr[0][i].kapacitet == searchedKap) {
              arr[1][i] = arr[0][i];
            }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING ONLY FOR KAPACITET: "+"<span class='plav'>"+kap+"</span>";
      }

      //LEVEL I TASK --RADI
      if (lvl !== "" && task !=="" && kap ==="") {
        var splitted = task.split(';');

        for (var i = 0; i < arr[0].length; i++) {
          for (var j = 0; j < splitted.length; j++) {
            if(arr[0][i].task.toLowerCase().indexOf(splitted[j])>=0 && arr[0][i].level == searchedLvl) {
              arr[1][i] = arr[0][i];
            }
          }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING FOR LEVEL: "+"<span class='plav'>"+lvl+"</span>"+" AND TASK KEYWORDS: "+"<span class='plav'>"+splitted+"</span>";
      }

      //LEVEL I KAPACITET --RADI
      if (lvl !== "" && task ==="" && kap !=="") {
        for (var i = 0; i < arr[0].length; i++) {
            if(arr[0][i].kapacitet == searchedKap && arr[0][i].level == searchedLvl) {
              arr[1][i] = arr[0][i];
            }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING FOR LEVEL: "+"<span class='plav'>"+lvl+"</span>"+" AND KAPACITET: "+"<span class='plav'>"+kap+"</span>";
      }

      //TASK I KAPACITET --RADI
      if (lvl === "" && task !=="" && kap !=="") {
        var splitted = task.split(';');

        for (var i = 0; i < arr[0].length; i++) {
          for (var j = 0; j < splitted.length; j++) {
            if(arr[0][i].task.toLowerCase().indexOf(splitted[j])>=0 && arr[0][i].kapacitet == searchedKap) {
              arr[1][i] = arr[0][i];
            }
          }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING FOR TASK KEYWORDS: "+"<span class='plav'>"+splitted+"</span>"+" AND KAPACITET: "+"<span class='plav'>"+kap+"</span>";
      }

      //LEVEL I TASK I KAPACITET --RADI
      if (lvl !== "" && task !=="" && kap !=="") {
        var splitted = task.split(';');

        for (var i = 0; i < arr[0].length; i++) {
          for (var j = 0; j < splitted.length; j++) {
            if(arr[0][i].task.toLowerCase().indexOf(splitted[j])>=0 && arr[0][i].kapacitet == searchedKap && arr[0][i].level == searchedLvl) {
              arr[1][i] = arr[0][i];
            }
          }
        }
        document.getElementById('currentVersionInBox').innerHTML = "SHOWING FOR LEVEL: "+"<span class='plav'>"+lvl+"</span>"+" AND TASK KEYWORDS: "+"<span class='plav'>"+splitted+"</span>"+" AND KAPACITET: "+"<span class='plav'>"+kap+"</span>";
      }

      $scope.elToShow = 1;
  };




});

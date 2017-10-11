angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth, $rootScope) {
  
  var checalogin = localStorage.getItem("user");
  if(checalogin && checalogin.length > 0){
    $rootScope.estaLogado = true;
  }


  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  $scope.logout = function(){
    $rootScope.estaLogado = false;
    localStorage.removeItem("user");
  }
 
  $scope.login = function() {
    $scope.modal.show();
  };

  
  $scope.doLogin = function() {
    Auth.verificaLogin($scope.loginData).then(ret => {
    
    console.log('Doing login', $scope.loginData);
    $rootScope.estaLogado= true;
    Auth.savaLocalStorage("user", JSON.stringify(ret.data));
    Auth.savaLocalStorage(("token", ret.data.token));
    console.log("usuario logado");
    });
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CachorrosCtrl', function($scope) {
  $scope.animais =[
    {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    },
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    },
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    },
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    }
    ];
})
.controller('GatosCtrl', function($scope, AnimAPI) {
  $scope.animais=[
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    },
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    },
     {
      "id":"1",
      "nome":"Thor",
      "descricao":"Pensando mais a longo prazo, o inicio da atividade geral da formação",
      "contato":"23456789",
      "imagem":"http://lorempixel.com/300/150/animals/55"
    }
    ]
  $scope.titulo = "Busca por Gatos";
  
  AnimAPI.query(function(anim){
    console.log(anim.data);
    $scope.animais = anim.data;
  });
})

.controller('GatoCtrl', function($scope, AnimAPI, $state, $stateParams){
  var idAnimal = $stateParams.id;
  AnimAPI.query({id: idAnimal}, function (anim){
    $scope.animal = anim.data;
    $scope.titulo = anim.data.nome;
  })
})

.controller('PerfilCtrl', function($scope) {
  var usertemp = localStorage.getItem("user");
  console.log(usertemp);
  if(usertemp) $scope.user = JSON.parse(usertemp).user;
})


.controller('CadastroAnimalCtrl', function($scope, AnimAPI){
  $scope.animal = new AnimAPI();
  $scope.cadastra = function(){
    AnimAPI.save($scope.animal, function(x){
      console.log(x);
    })
  }
});


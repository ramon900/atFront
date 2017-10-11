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
      console.log('voltei com :');
      console.log(ret);
      $rootScope.estaLogado = true;
      Auth.savaLocalStorage("user",JSON.stringify(ret.data));
    });
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('CachorrosCtrl', function($scope, AnimAPI) {
  $scope.titulo="Busca por cachorros";
  $scope.filtro="Cachorro"

  AnimAPI.query(function(anim){
    console.log(anim.data);
    $scope.animais = anim.data;
  });

})
.controller('CachorroCtrl', function($scope, AnimAPI, $state, $stateParams) {

  console.log($stateParams);
  var idAnimal = $stateParams.id;
  AnimAPI.query({id: idAnimal}, function(anim){
    console.log(anim.data);
    $scope.animal = anim.data;
    $scope.titulo = anim.data.nome;
  })

})



.controller('GatosCtrl', function($scope, AnimAPI) {
  
  $scope.titulo = "Busca por Gatos";
  $scope.filtro="Gato"
  
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
})

.controller('CadastroUsuarioCtrl', function($scope, UsuAPI){
  $scope.usuario = new UsuAPI();
  $scope.SingUp = function(){
    UsuAPI.save($scope.usuario, function(x){
      console.log(x);
    })
  }
});



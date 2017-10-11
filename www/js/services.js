angular.module('starter.services',[])
.constant("configs",{
    "enderecoapi": "http://138.197.191.31:3000/v1/"
})
.factory('Auth', function($http, configs, $state){
    return{
        login: function(email, password){
            return $http.post(configs.enderecoapi + 'auth/signin', {
                email: email,
                password: password
            });
        },
        cadastro: function(){
             return true;
        },
        verificaLogin: function(usuario){
             return this.login(usuario.username,usuario.password).then(
                 function(response){
                     console.log('OK');
                     console.log(response);
                     return response.data;
                     
                 },
                 function(error){
                     console.log('ERR');
                     console.log(error);
                     return error.data;
                     
                 });
             },
             savaLocalStorage: function(nome, valor){
                 localStorage.setItem(nome, valor);
             },
             pegaToken: function(){
                 var token = '';
                 var temp = localStorage.getItem("user");
                 console.log(temp);
                 if(temp){
                     token = JSON.parse(temp).token
                 }
                 return token;
             }
        }
    })
    .factory('AnimAPI', function($resource, configs, Auth){
        var campoToken={
            'Authorizarion': 'Bearer' + Auth.pegaToken()
        };
        
        return $resource(configs.enderecoapi + 'animals/:id', {id: '@_id'},
        {
            update :{
            method : 'PUT',
            headers: campoToken
            },
            save   :{
            method :'POST',
            headers:campoToken
            },
            
            query  :{ headers:campoToken },
            remove: { headers:campoToken },
            delete: { headers:campoToken },
            get: { headers:campoToken },
        });
    })

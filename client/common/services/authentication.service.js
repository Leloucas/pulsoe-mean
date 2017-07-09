angular.module('meanPulso').service('authentication',authentication);

authentication.$inject = ['$http', '$window', '$location'];
  function authentication ($http, $window, $location) {

    var saveToken = function (token) {
      $window.localStorage.token = token;
    };

    var getToken = function () {
      return $window.localStorage.token;
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name,
          lastname : payload.lastname,
          avatar : payload.avatar,
          registered : payload.registered,
          level : payload.level
        };
      }
    };

    var register = function(user) {
      return $http.post('/api/register', user).then(function(data){
        // console.log(data.data);
        saveToken(data.data);
        return data;
      }).catch(function(error){
        // console.log(error);
        return error;
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).then(function(data) {
        // console.log(data.data);
        saveToken(data.data);
        return data;
      }).catch(function(error){
        // console.log(error.status);
        return error;
      });
    };

    var replaceToken = function(token){
      $window.localStorage.removeItem('token');
      $window.localStorage.token = token;
      if($window.localStorage.token){
        return true;
      } else {
        return false;
      }
    };

    logout = function() {
      console.log("logged out");
      $window.localStorage.removeItem('token');

      $location.path('/');
      $window.location.reload();
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      replaceToken : replaceToken,
      login : login,
      logout : logout
    };
}

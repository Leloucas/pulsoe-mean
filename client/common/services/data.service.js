angular.module('meanPulso').service('meanData',meanData);

meanData.$inject = ['$http', 'authentication', 'Upload'];

function meanData ($http, authentication, Upload){
  var token = authentication.getToken();

  var headers = {
    headers : {
      Authorization : 'Bearer '+ token
    }
  };


  var getProfile = function(){
    return $http.get('/api/profile', headers);
  };

  var saveInfo = function(data, file){

    var req = {
      url: '/api/profile',
      method: 'PUT',
      headers: {Authorization : 'Bearer '+ token},
      data: {user: data, file: file}
    };

    return Upload.upload(req).then(complete).catch(failed);

    // return $http(req).then(complete).catch(failed);
  };

  var updatePic = function(file){
    var req = {
      url: '/api/upload',
      method : 'PUT',
      headers: {Authorization : 'Bearer '+ token},
      data : {file : file}
    };

    return Upload.upload(req).then(complete).catch(failed);
  }

  function experienciaDisplay(id){
    return $http.get('/api/experiencia/'+id, headers).then(complete).catch(failed);
  }

  function experienciaSave(exp){
    return $http.post('/api/experiencia', exp, headers).then(complete).catch(failed);
  }

  function experienciaUpdate(id, exp){
    return $http.put('/api/experiencia/'+id, exp, headers).then(complete).catch(failed);
  }

  function getAllUsers(){
    return $http.get('/api/users',headers).then(complete).catch(failed);
  }

  function getOneUser(id){
    return $http.get('/api/users/'+id, headers).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    return error;
    console.log(error.statusText);
  }

  return {
    getProfile : getProfile,
    saveInfo : saveInfo,
    updatePic : updatePic,
    experienciaDisplay : experienciaDisplay,
    experienciaUpdate : experienciaUpdate,
    experienciaSave : experienciaSave,
    getAllUsers : getAllUsers,
    getOneUser : getOneUser
  };
}

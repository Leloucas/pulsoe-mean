angular.module('meanPulso').service('meanData',meanData);

meanData.$inject = ['$http', 'authentication', 'Upload'];

function meanData ($http, authentication, Upload){
  var token = authentication.getToken();

  var headers = {
    headers : {
      Authorization : 'Bearer '+ token
    }
  };



  function getProfile(){
    return $http.get('/api/profile', headers).then(complete).catch(failed);
  }

  function saveInfo(data, file){

    var req = {
      url: '/api/profile',
      method: 'PUT',
      headers: {Authorization : 'Bearer '+ token},
      data: {user: data, file: file}
    };

    return Upload.upload(req).then(complete).catch(failed);

    // return $http(req).then(complete).catch(failed);
  }

  function updatePic(file){
    var req = {
      url: '/api/upload',
      method : 'PUT',
      headers: {Authorization : 'Bearer '+ token},
      data : {file : file}
    };

    return Upload.upload(req).then(complete).catch(failed);
  }

  function getUserData(){
    return $http.get('/api/userdata', headers).then(complete).catch(failed);
  }

  function putUserData(user){
    return $http.put('/api/userdata', user, headers).then(complete).catch(failed);
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

  function updateUser(id, info){
    return $http.put('/api/users/'+id, info, headers).then(complete).catch(failed);
  }

  function saveNewSoftware(software){
    return $http.post('/api/software', software, headers).then(complete).catch(failed);
  }

  function deleteSoftware(id){
    return $http.delete('/api/software/'+id, headers).then(complete).catch(failed);
  }

  function getAllAreas(count, offset){
    if(count || offset){
      return $http({
        url: '/api/areas',
        method: "GET",
        params: {count: count, offset : offset}
     }).then(complete).catch(failed);
    } else {
      return $http.get('/api/areas', headers).then(complete).catch(failed);
    }
  }

  function saveNewArea(area){
    return $http.post('/api/areas', area, headers).then(complete).catch(failed);
  }

  function getOneArea(id){
    return $http.get('/api/areas/'+id, headers).then(complete).catch(failed);
  }

  function updateArea(id, area){
    return $http.put('/api/areas/'+id, area, headers).then(complete).catch(failed);
  }

  function restoreArea(id, area){
    return $http.patch('/api/areas/'+id, area, headers).then(complete).catch(failed);
  }

  function deleteArea(id){
    return $http.delete('/api/areas/'+id, headers).then(complete).catch(failed);
  }

  function getCategorias(id){
    return $http.get('/api/areas/'+id+'/categorias', headers).then(complete).catch(failed);
  }

  function addCategoria(areaId, categoria){
    return $http.post('/api/areas/'+areaId+'/categorias', categoria, headers).then(complete).catch(failed);
  }

  function getOneCategoria(areaId, catId){
    return $http.get('/api/areas/'+areaId+'/categorias/'+catId, headers).then(complete).catch(failed);
  }

  function updateOneCategoria(areaId, catId, categoria){
    return $http.put('/api/areas/'+areaId+'/categorias/'+catId, categoria, headers).then(complete).catch(failed);
  }

  function deleteCategoria(areaId, catId){
    return $http.delete('/api/areas/'+areaId+'/categorias/'+catId, headers).then(complete).catch(failed);
  }

  function getVacantes(params){
    if(!angular.equals({}, params)){
      return $http({
        url: '/api/vacantes',
        method: "GET",
        params: params
     }).then(complete).catch(failed);
    } else {
      return $http.get('/api/vacantes').then(complete).catch(failed);
    }
  }
  function saveVacante(data, file){

    var req = {
      url: '/api/vacantes',
      method: 'POST',
      headers: {Authorization : 'Bearer '+ token},
      data: {vacante: data, file: file}
    };

    return Upload.upload(req).then(complete).catch(failed);
  }

  function getOneVacante(id){
    return $http.get('/api/vacantes/'+id).then(complete).catch(failed);
  }

  function updateVacante(id, vacante, file){
    var req = {
      url : '/api/vacantes/'+id,
      method : 'PUT',
      headers : {Authorization : 'Bearer ' + token},
      data : {vacante : vacante, file : file}
    };

    return Upload.upload(req).then(complete).catch(failed);
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
    getUserData : getUserData,
    putUserData : putUserData,
    experienciaDisplay : experienciaDisplay,
    experienciaUpdate : experienciaUpdate,
    experienciaSave : experienciaSave,
    getAllUsers : getAllUsers,
    saveNewSoftware : saveNewSoftware,
    deleteSoftware : deleteSoftware,
    getOneUser : getOneUser,
    updateUser : updateUser,
    getAllAreas : getAllAreas,
    saveNewArea : saveNewArea,
    getOneArea : getOneArea,
    updateArea : updateArea,
    restoreArea : restoreArea,
    deleteArea : deleteArea,
    getCategorias : getCategorias,
    addCategoria : addCategoria,
    getOneCategoria : getOneCategoria,
    updateOneCategoria : updateOneCategoria,
    deleteCategoria : deleteCategoria,
    getVacantes : getVacantes,
    saveVacante : saveVacante,
    getOneVacante : getOneVacante,
    updateVacante : updateVacante
  };
}

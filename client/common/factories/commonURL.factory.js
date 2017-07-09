angular.module('meanPulso').factory('commonURL', commonURL);

commonURL.$inject = ['$http'];
function commonURL($http){
  return {
    countries : getCountries,
    states : getStates,
    languages : getLanguages
  }

  function getCountries(){
    return $http.get('/data/paises.json').then(complete).catch(failed);
  }

  function getStates(file){
    return $http.get('/data/estados/'+file+'.json').then(complete).catch(failed);
  }

  function getLanguages(){
    return $http.get('/data/idiomas.json').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error);
  }
}

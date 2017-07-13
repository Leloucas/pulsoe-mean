angular.module('meanPulso').controller('editInfoCtrl', editInfoCtrl);

editInfoCtrl.$inject = ['$rootScope', 'meanData', 'commonURL', '$timeout', '$location'];

function editInfoCtrl($rootScope, meanData, commonURL, $timeout, $location){
  var vm = this;

  $rootScope.header = "Editar info";

  vm.user = {};

  vm.error = false;

  vm.errormessage = "";

  vm.year = new Date().getFullYear();

  meanData.getUserData()
    .then(function(response){
      vm.user = response.data.data;
      vm.lng = vm.user.location.coordenadas[0];
      vm.marker.position[1] = vm.lng;
      vm.lat = vm.user.location.coordenadas[1];
      vm.marker.position[0] = vm.lat;
      vm.chosenPlace = vm.user.location.direccion;
      vm.map.center = vm.marker.position;
      vm.map.zoom = 17;
      vm.getBirthday(vm.user);
    })
    .catch(function(error){
      console.log(error);
  });

  vm.days = [];
  vm.months = [
      {"mes":01, "nombre":"Enero"},
      {"mes":02, "nombre":"Febrero"},
      {"mes":03, "nombre":"Marzo"},
      {"mes":04, "nombre":"Abril"},
      {"mes":05, "nombre":"Mayo"},
      {"mes":06, "nombre":"Junio"},
      {"mes":07, "nombre":"Julio"},
      {"mes":08, "nombre":"Agosto"},
      {"mes":09, "nombre":"Septiembre"},
      {"mes":10, "nombre":"Octubre"},
      {"mes":11, "nombre":"Noviembre"},
      {"mes":12, "nombre":"Diciembre"}
      ];
  vm.years = [];

  vm.countries = [];
  vm.languages = [];

  for (var i = vm.year; i >= (vm.year - 125); i-=1) {
      vm.years.push(i);
  }
  for (var i = 1; i <= 31; i++) {
    vm.days.push(i);
  }

  vm.getBirthday = function(user){
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var fecha = new Date( user.fechaNacimiento );

    vm.birthyear = fecha.getFullYear();
    vm.birthmonth = {"mes" : fecha.getMonth() + 1, "nombre" : meses[fecha.getMonth()]};
    vm.birthday = fecha.getDate();
  };

  $timeout(function(){
    commonURL.countries().then(function(response){
      // console.log(response);
      data = response.data;
        data.forEach(function(element) {
            vm.countries.push(element);
            if(element.name === vm.user.location.pais){
              vm.user.location.pais = element;
            }
            if(element.name === vm.user.nacionalidad){
              vm.user.nacionalidad = element;
            }
        }, this);
          vm.getEstado();
        vm.countries.push("Otro");
    }).catch(function(error){
        console.log(error);
    });
  },500);

  commonURL.languages().then(function(response){
    // console.log(response);
    data = response.data;
      data.forEach(function(element) {
          vm.languages.push(element.nombre);
      }, this);
      vm.countries.push("Otro");
  }).catch(function(error){
      console.log(error);
  });

  vm.getEstado = function(){
      vm.states = [];
      if(vm.user.location.pais.filename){
          // console.log(vm.pais.filename);
          commonURL.states(vm.user.location.pais.filename).then(function(response){
              data = response.data;
              data.forEach(function(element) {
                  vm.states.push(element);
                  if(element.name === vm.user.location.estado){
                    vm.user.location.estado = element;
                  }
              }, this);
          }).catch(function(error){
              console.log(error);
          });
      }else{
          console.log("no hay");
      }
      vm.states.push({"name":"Otro", "code":"N/A"});
  };

  vm.map = {
      center: [29.084483, -110.958786],
      options: function() {
          return {
          streetViewControl: false,
          scrollwheel: false
          }
      },
      zoom : 5
  };

  vm.marker = {
      position: [],
      decimals: 4,
      options: function() {
          return { draggable: true };
      }
  };

  vm.callmap = function(){
      $timeout(function(){
        // console.log(vm.chosenPlace);
        vm.lat = vm.chosenPlaceDetails.geometry.location.lat();
        vm.lng = vm.chosenPlaceDetails.geometry.location.lng();
        vm.colonia = vm.chosenPlaceDetails.address_components[2].short_name;
        vm.chosenPlace = vm.chosenPlaceDetails.formatted_address;
        vm.getmarker();
      },1000);
      // setTimeout(vm.getmarker,1000);
  };

  vm.getmarker = function() {
    vm.marker.position = [vm.lat, vm.lng];
    vm.map.center = [vm.lat, vm.lng];
    vm.map.zoom = 17;
  };

  vm.updateUser = function(){
    vm.user.fechaNacimiento = new Date(vm.birthyear, vm.birthmonth.mes - 1, vm.birthday);
    vm.user.nacionalidad = vm.user.nacionalidad.name;
    vm.user.location = {
      "direccion" : vm.chosenPlace,
      "coordenadas" : [
        parseFloat(vm.lng,10),
        parseFloat(vm.lat,10)
      ],
      "pais" : vm.user.location.pais.name,
      "estado" : vm.user.location.estado.name,
      "ciudad" : vm.user.location.ciudad,
    };
    if(vm.userDataForm.$valid){
      meanData.putUserData(vm.user)
        .then(function(response){
          if(response.status === 204){
            vm.message = "Guardado exitosamente, volviendo al perfil...";
            $timeout(function(){
              $location.path('/perfil');
            }, 2500);
          }
        })
        .catch(function(error){
          console.log(error);
      });
    } else {
      vm.error = true;
      vm.errormessage = "Hay un error en el formulario";
    }
  };

}
// celular:"6621248791"
// discapacidad:""
// estadoCivil:"soltero"
// facebook:"https://www.facebook.com/leloucas.gonzalo"
// fechaNacimiento:Sun Oct 18 1992 00:00:00 GMT-0700 (US Mountain Standard Time)
// imagen:"avatar-1499835176032bqp.png"
// licenciaConducir:false
// linkedIn:""
// location:Object
// ciudad:"Hermosillo"
// coordenadas:0:-110.942050699999981:29.0769752
// direccion:"Del Razo 19, Col del Razo, Hermosillo, Son., México"
// estado:"Sonora"pais:"Mexico"
// nacionalidad:"Mexico"
// sexo:"hombre"
// telefono:"6622120351"
// twitter:""
// vehiculoPropio:false
// _id:"59555a0b40dccf0e38366baf"

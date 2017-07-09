angular.module('meanPulso').controller('infoCtrl',infoCtrl);

infoCtrl.$inject = ['$scope', '$rootScope', '$window', '$location', 'authentication', 'commonURL', '$timeout', 'Upload', 'meanData'];
function infoCtrl($scope, $rootScope, $window, $location, authentication, commonURL, $timeout, Upload, meanData){
  var vm = this;

  $rootScope.header = "Registro";

  vm.user = {};

    vm.maxlenght = 600;

    vm.year = new Date().getFullYear();

    vm.step = 1;
    vm.maxStep = 6;
    vm.stepWidth = {
        "width" : "0%"
    };
    vm.error = false;
    vm.errormessage = "";
    vm.userJob = [];
    vm.userIdioma = [];
    vm.userCapacitacion = [];
    vm.userSkill = [];
    vm.userSoftware = [];

    vm.countries = [];
    vm.languages = [];

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
    for (var i = vm.year; i >= (vm.year - 125); i-=1) {
        vm.years.push(i);
    }
    for (var i = 1; i <= 31; i++) {
      vm.days.push(i);
    }
    commonURL.countries().then(function(response){
      // console.log(response);
      data = response.data;
        data.forEach(function(element) {
            vm.countries.push(element);
        }, this);
        vm.countries.push("Otro");
    }).catch(function(error){
        console.log(error);
    });

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
        if(vm.pais.filename){
            // console.log(vm.pais.filename);
            commonURL.states(vm.pais.filename).then(function(response){
                // console.log(response);
                data = response.data;
                data.forEach(function(element) {
                    vm.states.push(element);
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

    vm.saveUserData = function(){
        if(!vm.inc){
          vm.discapacidad = "";
        }
        // vm.discapacidad = (typeof vm.discapacidad === 'undefined') ? "" : vm.discapacidad;
        vm.facebook = (typeof vm.facebook === 'undefined') ? "" : vm.facebook;
        vm.twitter = (typeof vm.twitter === 'undefined') ? "" : vm.twitter;
        vm.linkedin = (typeof vm.linkedin === 'undefined') ? "" : vm.linkedin;
        vm.licenciaConducir = (typeof vm.licenciaConducir === 'undefined') ? false : vm.licenciaConducir;
        vm.vehiculoPropio = (typeof vm.vehiculoPropio === 'undefined') ? false : vm.vehiculoPropio;

        var userData = {
            // fechaNacimiento : vm.birthyear+"-"+vm.birthmonth.mes+"-"+vm.birthday,
            "fechaNacimiento" : new Date(vm.birthyear, vm.birthmonth.mes - 1, vm.birthday),
            "sexo" : vm.sexo,
            // "imagen" : vm.avatar,
            "estadoCivil" : vm.estadoCivil,
            "telefono" : vm.telefono,
            "celular" : vm.celular,
            "colonia" : vm.colonia,
            "location" : {
              "direccion" : vm.chosenPlace,
              "coordenadas" : [
                parseFloat(vm.lng,10),
                parseFloat(vm.lat,10)
              ],
              "zip" : vm.zip,
              "colonia" : vm.colonia,
              "pais" : vm.pais.name,
              "estado" : vm.estado.name,
              "ciudad" : vm.ciudad,
            },
            "nacionalidad" : vm.nacionalidad.name,
            "discapacidad" : vm.discapacidad,
            "facebook" : vm.facebook,
            "twitter" : vm.twitter,
            "linkedin" : vm.linkedin,
            "licenciaConducir" : vm.licenciaConducir,
            "vehiculoPropio" : vm.vehiculoPropio,
        };

        if(vm.userDataForm.$valid){
            vm.error = false;
            // console.log(userData);
            vm.user.datos = userData;
            // console.log(vm.user);

            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo");
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
        // var geocoder= new google.maps.Geocoder();
        // var address = document.getElementById('address-input').value;
        // geocoder.geocode( { 'address': address}, function(results, status) {
        // if (status == google.maps.GeocoderStatus.OK) {
        //     var lat = results[0].geometry.location.lat();
        //     var lng = results[0].geometry.location.lng();
        //     vm.lat = lat;
        //     vm.lng = lng;
      vm.marker.position = [vm.lat, vm.lng];
      vm.map.center = [vm.lat, vm.lng];
      vm.map.zoom = 17;
        //     // console.log(vm.marker.position);
        // } else {
        //     alert('Geocode was not successful for the following reason: ' + status);
        // }
        // });
    };

    vm.addExperiencia = function(){
        vm.actual = (typeof vm.actual === 'undefined') ? false : vm.actual;

        var fechaFinal = '';
        if(!vm.actual){
          fechaFinal = new Date(vm.yearFinal, vm.mesFinal.mes -1 ,"01");
        }

        var userJob = {
            "nombre" : vm.nomEmpresa,
            "giroEmpresa" : vm.giro,
            "puesto" : vm.cargo,
            "area" : vm.area,
            "fechaInicio" : new Date(vm.yearInicio, vm.mesInicio.mes - 1, "01"),
            "fechaFinal" : fechaFinal,
            "trabajoActual" : vm.actual,
            "descripcion" : vm.expDesc,
            "sueldo" : {
              "cantidad" : vm.sueldo,
              "periodo" : vm.periodo
            }
        };
        vm.userJob.push(userJob);

        vm.nomEmpresa = "";
        vm.giro = "";
        vm.cargo = "";
        vm.area = "";
        vm.mesInicio = "";
        vm.mesFinal = "";
        vm.actual = "";
        vm.expDesc = "";
        vm.sueldo = "";
        vm.periodo = "";
        vm.userExperienciaForm.$setPristine();
        vm.userExperienciaForm.$setUntouched();

    };

    vm.saveUserExperiencia = function(){

        if(vm.userJob.length >= 1){
            vm.error = false;
            // console.log(vm.userJob);
            vm.user.experiencia = vm.userJob;
            // console.log(vm.user);
            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo")
        }

    };

    vm.saveUserFormacion = function(){
      // console.log(vm.yearfinal, vm.mesFinal.mes - 1);
      var fechaFinal;
      if(vm.estado !== "terminado"){
        fechaFinal = '';
      } else {
        fechaFinal = new Date(vm.yearFinal, vm.mesFinal.mes - 1, "01")
      }
        var userFormacion = {
            "centroEducativo" : vm.centro,
            "nivel" : vm.nivel,
            "estado" : vm.estado,
            "fechaInicio" : new Date(vm.yearInicio, vm.mesInicio.mes - 1, "01"),
            "fechaFinal" : fechaFinal,
        };

        // vm.userIdioma
        // vm.userCapacitacion

        if(vm.userFormacionForm.$valid){
            vm.error = false;
            // saveAndContinue(userData);
            // formación
            vm.user.formacion = userFormacion;
            // idioma
            vm.user.idioma = vm.userIdioma;
            // // capacitacion
            vm.user.capacitacion = vm.userCapacitacion;
            // console.log(vm.user);
            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo")
        }

    };

    vm.addIdioma = function(){
        var userData = {
            "idioma" : vm.idioma,
            "conversacion" : vm.conversacion,
            "lectura" : vm.lectura,
            "redaccion" : vm.redaccion
        };
        vm.userIdioma.push(userData);
        // console.log(vm.userJob);

        vm.idioma = "";
        vm.lectura = "";
        vm.redaccion = "";
        vm.conversacion = "";
    };

    vm.addCapacitacion = function(){
        var userData = {
            "evento" : vm.capacitacion,
            "area" : vm.area,
            "descripcion" : vm.capacitacionDesc
        };

        vm.userCapacitacion.push(userData);


        vm.capacitacion = "";
        vm.area = "";
        vm.capacitacionDesc = "";
    };

    vm.addSkill = function(){
        var userData = {
            "habilidad" : vm.habilidad,
        };

        vm.userSkill.push(userData);

        vm.habilidad = "";
    };

    vm.addSoftware = function(){
        var userData = {
            "software" : vm.software,
            "nivel" : vm.nivelHab
        };

        vm.userSoftware.push(userData);

        vm.software = "";
        vm.nivelHab = "";
    };

    vm.saveUserHabilidad = function(){

        if(vm.userSoftware.length >= 1){
          vm.user.habilidad = vm.habilidad;
          // saveAndContinue(vm.userIdioma);
          // habilidades
          // console.log(vm.userSkill);
          vm.user.software = vm.userSoftware;
          // Software
          // console.log(vm.userSoftware);
          // console.log(vm.user);
          vm.nextStep();
        } else {
          vm.error = true;
          console.log("Falta algo");
        }
    };

     vm.saveUserAdicional = function(){
         var userSueldo = {
            "sueldo" : parseInt(vm.sueldo, 10),
            "periodo" : vm.periodo
         };
         var userPuestos = [
            vm.userPuesto1,
            vm.userPuesto2,
            vm.userPuesto3
         ];
         var userValores = [
            vm.userValor1,
            vm.userValor2,
            vm.userValor3
        ];

        var userAreas = [
          vm.userArea1,
          vm.userArea2,
          vm.userArea3
        ]

        if(vm.userAdicionalForm.$valid){
            // sueldo
            vm.user.salary = userSueldo;
            // console.log(userSueldo);
            // puestos
            vm.user.position = userPuestos;
            // console.log(userPuestos);
            // valores
            vm.user.values = userValores;
            // console.log(userValores);
            // console.log(vm.user);
            vm.user.areas = userAreas;
            vm.nextStep();
        } else {
            vm.error = true;
            console.log("Falta algo");
        }
    };

    vm.submitInfo = function(){

      meanData.saveInfo(vm.user, vm.avatar)
      .then(function(response){
          vm.error = false;
          if(response.status === 201){
            if(authentication.replaceToken(response.data)){
              $window.location.reload();
            } else {
              console.log("not saved");
            }
          }
        }).catch(function(error){
          console.log(error);
          vm.error = true;
          if(error.data.code === "LIMIT_FILE_SIZE"){
            vm.errormessage = "El tamaño de la imagen debe ser menor a 2MB";
          } else if(error.data.code === "FILE_EXT"){
            vm.errormessage = "La imagen debe tener extensión válida (.jpeg, .png, .jpg)";
          }
        });
    };

    vm.removeExp = function(exp){
     var removExp = vm.userJob.indexOf(exp);
     vm.userJob.splice(removExp, 1);
   };

   vm.removeLang = function(lang){
     var removLang = vm.userIdioma.indexOf(lang);
     vm.userIdioma.splice(removLang, 1);
   };

   vm.removeCap = function(cap){
     var removCap = vm.userIdioma.indexOf(cap);
     vm.userIdioma.splice(removCap, 1);
   };

   vm.removeSkill = function(skill){
     var removSkill =vm.userSkill.indexOf(skill);
     vm.userSkill.splice(removSkill, 1);
   };

   vm.removeSoftware = function(soft){
     var removSoft =vm.userSkill.indexOf(soft);
     vm.userSoftware.splice(removSoft, 1);
   };

    vm.nextStep = function(){
        if(vm.step <= vm.maxStep || !vm.error){
            vm.step += 1;
            setProgress(vm.step);
            $window.scrollTo(0, 0);
         }
     };
     vm.previousStep = function(){
         vm.step -= 1;
         setProgress(vm.step);
         $window.scrollTo(0, 0);
     };

     var setProgress = function(value){
        //  console.log(value);
         vm.stepWidth.width = ((value/vm.maxStep)*100) + "%";
     };

     vm.isSelected = function(index) {
        return index === vm.checkboxSelection;
    };

    // $scope.$on('$locationChangeStart', function( event ) {
    //     if(vm.step !== 6){
    //       var answer = confirm("Aún no ha registrado su información.\n¿Desea salir de la página?")
    //       if (!answer) {
    //           event.preventDefault();
    //       }
    //     }
    // });
}

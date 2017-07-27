angular.module('meanPulso').controller('crearVacanteCtrl', crearVacanteCtrl);

crearVacanteCtrl.$inject = ['$rootScope', 'commonURL', '$location', 'meanData', 'authentication', '$window', '$timeout'];

function crearVacanteCtrl($rootScope, commonURL, $location, meanData, authentication, $window, $timeout){
  var vm = this;

  $rootScope.header = "Crear vacante";

  vm.vacantes = [];

  vm.error = false;
  vm.message = '';
  vm.response = false;

  vm.year = new Date().getFullYear();

  vm.now = new Date();
  vm.now.setDate(vm.now.getDate() + 20);

  vm.idiomas = [];
  vm.skills = [];
  vm.softwares = [];

  vm.countries = [];
  vm.states = [];
  vm.languages = [];

  vm.areas = [];

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
  for (var i = vm.year; i <= (vm.year + 5); i+=1) {
      vm.years.push(i);
  }
  for (var i = 1; i <= 31; i++) {
    vm.days.push(i);
  }

  meanData.getAllAreas()
    .then(function(response){
      if(response.status === 200){
        vm.areas = response.data;
        vm.response = false;
      } else if(response.status === 500){
        console.log(response);
        vm.error = true;
        vm.response = true;
        vm.message = "Error al buscar las áreas";
      } else if(response.status === 403){
        vm.error = true;
        vm.response = true;
        $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
        authentication.logout();
      }
    })
    .catch(function(error){
      console.log(error);
  });

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
              vm.states.push({"name":"Otro", "code":"N/A"});
          }).catch(function(error){
              console.log(error);
          });
      }else{
          console.log("no hay");
          vm.states.push({"name":"Otro", "code":"N/A"});
      }
  };

  vm.getCategorias = function(area){
    if(area.categorias.length){
      vm.noCat = false;
      vm.categorias =  area.categorias;
    } else {
      vm.noCat = true;
      vm.categorias = [];
    }
  };

  vm.addIdioma = function(){
      var data = {
          "idioma" : vm.idioma,
          "conversacion" : vm.conversacion,
          "lectura" : vm.lectura,
          "redaccion" : vm.redaccion
      };
      vm.idiomas.push(data);
      // console.log(vm.userJob);

      vm.idioma = "";
      vm.lectura = "";
      vm.redaccion = "";
      vm.conversacion = "";
  };

  vm.removeLang = function(lang){
    var removLang = vm.idiomas.indexOf(lang);
    vm.idiomas.splice(removLang, 1);
  };

  vm.addSoftware = function(){
      var data = {
          "software" : vm.software,
          "nivel" : vm.nivelHab
      };

      vm.softwares.push(data);

      vm.software = "";
      vm.nivelHab = "";
  };

  vm.removeSoftware = function(soft){
    var removSoft =vm.softwares.indexOf(soft);
    vm.softwares.splice(removSoft, 1);
  };

  vm.parse = function(){
    console.log();
  };

  vm.getFecha = function(){
    var year = vm.yearInicio || '';
    var month;

    if(vm.mesInicio && vm.mesInicio.hasOwnProperty('mes') && vm.mesInicio.mes !== undefined){
      month = vm.mesInicio.mes;
    }else{
      month = '';
    };
    var dia = vm.diaInicio || '';
    if(year && month && dia){
      console.log("ayy lmao");
      var fechaContrato = new Date(vm.yearInicio, vm.mesInicio.mes - 1, vm.diaInicio);
      console.log(fechaContrato);
    } else {
      console.log("pinchi madre");
    }
  };

  vm.createVacante = function(){
    var year = vm.yearInicio || '';
    var month;
    var fechaContrato;
    var dia = vm.diaInicio || '';

    if(vm.mesInicio && vm.mesInicio.hasOwnProperty('mes') && vm.mesInicio.mes !== undefined){
      month = vm.mesInicio.mes;
    }else{
      month = '';
    }

    if(year && month && dia){
      fechaContrato = new Date(vm.yearInicio, vm.mesInicio.mes - 1, vm.diaInicio);
    } else {
      fechaContrato = '';
    }

    var salario = {
      cantidad : 0,
      periodo : vm.periodoSalario || ''
    };
    if(vm.cantidadSalario && vm.cantidadSalario !== undefined){
      salario.cantidad = parseInt(vm.cantidadSalario, 10);
    }

    var experiencia = {
      cantidad : 0,
      periodo : vm.periodoExp || ''
    };
    if(vm.cantidadExp && vm.cantidadExp !== undefined){
      experiencia.cantidad = parseInt(vm.cantidadExp, 10);
    }

    var vacante = {
    	puesto : vm.puesto,
    	area : vm.area._id,
    	categoria : {
    		name : vm.categoria.name,
    		_id : vm.categoria._id
    	},
    	descripcion : vm.descripcion,
    	pais : vm.pais.name,
    	estado : vm.estado.name,
    	ciudad : vm.ciudad,
    	jornada : {
    	 horas : parseInt(vm.jornada.horas, 10),
    	 turno : vm.jornada.turno
    	},
    	tipoContrato : vm.tipoContrato,
    	salario : salario,
    	fechaContrato : fechaContrato,
    	experiencia : experiencia,
    	edadMin : parseInt(vm.edadMin, 10),
    	edadMax : parseInt(vm.edadMax, 10),
    	escolaridad : {
    	 grado : vm.escolaridadGrado || '',
    	 titulo : vm.escolaridadTitulo || ''
    	},
    	idioma : vm.idiomas,
    	software : vm.softwares,
    };

    meanData.saveVacante(vacante, vm.image)
      .then(function(response){
        if(response.status === 201){
          vm.error = false;
          vm.response = true;
          vm.message = 'Vacante guardada exitosamente. Volviendo a la lista';
          $timeout(function(){
            $location.path('/administracion/vacantes');
          },3500);
        } else if(response.status === 500){
          vm.error = true;
          vm.response = true;
          vm.message = 'Error al crear la vacante';
          console.log(response);
        }
      })
      .catch(function(error){
        console.log(error);
    });

    console.log(vacante);
  };
}

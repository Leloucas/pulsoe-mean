angular.module('meanPulso').controller('vacanteAsideCtrl',vacanteAsideCtrl);

vacanteAsideCtrl.$inject = ['$location', 'authentication', '$routeParams', 'meanData', 'commonURL'];

function vacanteAsideCtrl($location, authentication, $routeParams, meanData, commonURL){
  var vm = this;

  vm.showFilter = false;

  vm.countries = [];

  vm.areas = [];

  vm.vacantes = [];

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

  meanData.getAllAreas()
    .then(function(response){
      if(response.status === 200){
        vm.areas = response.data;
      } else {
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

  vm.getCategorias = function(area){
    if(area.categorias.length){
      vm.categorias =  area.categorias;
    } else {
      vm.categorias = [];
    }
  };

  vm.search = function(){
    var parameters = {};
    if(vm.puesto){
      puesto = vm.puesto;
      parameters['puesto'] = puesto;
    }
    if(vm.area){
      area = vm.area._id;
      parameters['area'] = area;
    }
    if(vm.categoria){
      categoria = vm.categoria._id;
      parameters['categoria'] = categoria;
    }
    if(vm.pais){
      var pais = vm.pais.name.replace(/\s+/g, '%20');
      parameters['pais'] = pais;
    }
    if(vm.estado){
      var estado = vm.estado.name.replace(/\s+/g, '%20');
      parameters['estado'] = estado;
    }
    if(vm.ciudad){
      var ciudad = vm.ciudad.replace(/\s+/g, '%20');
      parameters['ciudad'] = ciudad;
    }
    if(vm.datos){
      var datos = vm.datos.replace(/\s+/g, '%20');
      console.log(datos);
      parameters['datos'] = datos;
    }
    if (vm.edadMin) {
      var edadMin = vm.edadMin;
      parameters['edadMin'] = edadMin;
    }
    if (vm.edadMax) {
      var edadMax = vm.edadMax;
      parameters['edadMax'] = edadMax;
    }
    if(vm.cantidadSalario){
      var cantidad = vm.cantidadSalario;
      var periodo="";
      if (vm.periodoSalario) {
        var periodo = vm.periodoSalario;
      }
      parameters['salario'] = cantidad+'-'+periodo;
    }
    if (vm.tipoContrato) {
      var contrato = vm.tipoContrato;
      parameters['contrato'] = contrato;
    }

    $location.path('/vacantes').search(parameters);
  };

  var params = {count: 3};

  meanData.getVacantes(params)
    .then(function(response){
      if(response.status === 200){
        vm.vacantes = response.data;
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

}

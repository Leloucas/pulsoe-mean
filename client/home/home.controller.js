angular.module('meanPulso').controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$rootScope','$interval','$location', '$timeout'];
function homeCtrl ($rootScope,$interval,$location, $timeout) {
  var vm = this;

  $rootScope.header = "Pulso Empresarial";

  vm.carousel = [
      {image:'/img/banner/fondo01.jpg', description:'imagen01'},
      {image:'/img/banner/fondo12.jpg', description:'"Hermosillo crece...para arriba" - José Eugenio Gómez Rodríguez'},
      {image:'/img/banner/fondo08.jpg', description:'imagen08'},
      {image:'/img/banner/fondo13.jpg', description:'"Ruta 17 a las 9 de la noche." - Gamaliel Espinoza Macedo'},
      {image:'/img/banner/fondo011.jpg', description:'imagen011'},
      {image: '/img/banner/fondo010.jpg', description:'imagen010'}
  ];

  vm.currentImage = 0;

  vm.setCurrentSlide = function(index){
      vm.currentImage = index;
  };

  vm.isCurrentSlide = function(index){
      return vm.currentImage === index;
  };

  vm.nextSlide = function () {
      if(vm.currentImage < vm.carousel.length - 1){
          vm.currentImage += 1;
      } else {
          vm.currentImage = 0;
      }
      // vm.currentImage = (vm.currentImage < vm.carousel.length - 1) ? ++vm.currentImage : 0;
  };
  vm.prevSlide = function () {
      if(vm.currentImage > 0){
          vm.currentImage -= 1;
      } else {
          vm.currentImage = vm.carousel.length - 1;
      }
  };

  $interval(function(){vm.nextSlide();}, 4000);

  vm.proceed = function(url){
    $timeout(function(){
      $location.path(url);
    },500);
  };

  vm.portfolio = [{
      id: "#portfoliomodal1",
      img : '/img/portafolio/ser4.4.jpg',
      caption : 'Búsqueda de personal',
      portfolio : false,
      modal : {
          id : 'portfolioModal1',
          title : 'Búsqueda de personal',
          img : '/img/portafolio/ser4.4.jpg',
          text : "Garantizamos confidencialidad, alta tecnificación y estricto apego a los estándares de calidad en cada fase del proceso.\nAbarcamos los niveles Ejecutivos, Mandos medios, Técnicos especializados y Personal Operativo para 30 especialidades en:\nA) Comercialización \nB) Procesos internos \nC) Recursos Humanos \nD) Finanzas y Administración.,",
          url : '/servicios/busqueda',
          show : "portfolio1"
      }
  },{
      id: "#portfoliomodal2",
      img : '/img/portafolio/ser2.2.jpg',
      caption : 'Evaluación de personal',
      portfolio : false,
      modal : {
          id : 'portfolioModal2',
          title : 'Evaluación de personal',
          img : '/img/portafolio/ser2.2.jpg',
          text : 'Identificamos las habilidades de sus candidatos a contratación o de sus colaboradores para medir su competencia y potencial, a través de tests, el manejo y solución de problemas, ejercicios vivenciales y el análisis de casos en sesiones grupales.',
          url : '/servicios/evaluacion',
          show : "portfolio2"
      }
  },{
      id: "#portfoliomodal3",
      img : '/img/portafolio/ser7.7.jpg',
      caption : 'Subcontratación',
      portfolio : false,
      modal : {
          id : 'portfolioModal3',
          title : 'Subcontratación de personal',
          img : '/img/portafolio/ser7.7.jpg',
          text : 'Dotamos al cliente y/o administramos los equipos de trabajo que requiera, con personas efectivas y altamente calificadas en las áreas operativa, administrativa y de servicios.\nNos encargamos de ayudarle a optimizar sus recursos financieros y humanos al adelgazar su estructura de organización y evitar aumentos en su nómina directa.',
          url : '/servicios/subcontratacion',
          show : "portfolio3"
      }
  },{
      id: "#portfoliomodal4",
      img : '/img/portafolio/ser9.jpg',
      caption : 'Administración de nómina',
      portfolio : false,
      modal : {
          id : 'portfolioModal4',
          title : 'Administración de nómina',
          img : '/img/portafolio/ser9.jpg',
          text : 'Le damos cumplimiento a las obligaciones ante el IMSS, el personal recibe puntualmente su pago, con la periodicidad acordada.\nEl control operativo y administrativo ejercido por nosotros y los reportes que usted recibe aseguran la confiabilidad de sus registros contables.',
          url : '/servicios/administracion',
          show : "portfolio4"
      }
  },{
      id: "#portfoliomodal5",
      img : '/img/portafolio/ser5.5.jpg',
      caption : 'Coaching and Mentoring',
      portfolio : false,
      modal : {
          id : 'portfolioModal5',
          title : 'Coaching & mentoring',
          img : '/img/portafolio/ser5.5.jpg',
          text : 'Apoyamos el manejo de sus líderes formales y de sus colaboradores hacia un personal más calificado y efectivo. \nNuestra intervención puede abarcar desde la identificación de sus colaboradores que poseen capacidad sobresaliente, fortaleza caracterológica y mayor potencial de desarrollo hasta la etapa en la que la persona está habilitada para asumir la responsabilidad por mejorar su desempeño en forma permanente.',
          url : '/servicios/coaching',
          show : "portfolio5"
      }
  },{
      id: "#portfoliomodal6",
      img : '/img/portafolio/ser11.jpg',
      caption : 'Evaluación psicométrica',
      portfolio : false,
      modal : {
          id : 'portfolioModal6',
          title : 'Evaluación psicométrica',
          img : '/img/portafolio/ser11.jpg',
          text : 'Inventariamos las aptitudes y capacidades de los candidatos y colaboradores, para proveer información amplia y oportuna de ellos, así como de sus características fuertes y sus deficiencias, para evaluarla de la forma más relevante al puesto, de una manera seria, rigurosa e imparcial.',
          url : '/servicios/psicometrica',
          show : "portfolio6"
      }
  }];
}

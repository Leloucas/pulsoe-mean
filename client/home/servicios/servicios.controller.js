angular.module('meanPulso').controller('ServiciosController', ServiciosController);

ServiciosController.$inject = ['$rootScope'];
function ServiciosController($rootScope){
    var vm = this;

    $rootScope.header = "Nuestros servicios";

    vm.servicios = [
        {
            titulo : 'Búsqueda de personal',
            url : '/servicios/busqueda',
            text : 'Garantizamos confidencialidad, alta tecnificación y estricto apego a los estándares de calidad en cada fase del proceso.',
            img : 'img/portafolio/ser4.4.jpg',
            desc: ''
        },{
            titulo : 'Evaluación de personal',
            url : '/servicios/evaluacion',
            text : 'Identificamos las habilidades de sus candidatos a contratar o de sus colaboradores para medir su competencia y potencial.',
            img : 'img/portafolio/ser2.2.jpg',
            desc: ''
        },{
            titulo : 'Subcontratación de personal',
            url : '/servicios/subcontratacion',
            text : 'Dotamos al cliente y/o administramos los equipos de trabajo que requiera, con personas efectivas y altamente calificadas en las áreas operativa, administrativa y de servicios.',
            img : 'img/portafolio/ser7.7.jpg',
            desc: ''
        },{
            titulo : 'Administración de nómina',
            url : '/servicios/administracion',
            text : 'Le damos cumplimiento a las obligaciones ante el IMSS, el personal recibe puntualmente su pago, con la periodicidad acordada.',
            img : 'img/portafolio/ser9.jpg',
            desc: ''
        },{
            titulo : 'Coaching & Mentoring',
            url : '/servicios/coaching',
            text : 'Apoyamos el manejo de sus líderes formales y de sus colaboradores hacia un personal más calificado y efectivo.',
            img : 'img/portafolio/ser5.5.jpg',
            desc: ''
        },{
            titulo : 'Evaluación psicométrica',
            url : '/servicios/psicometrica',
            text : 'Inventariamos las aptitudes y capacidades de los candidatos y colaboradores, para proveer información amplia y oportuna de ellos.',
            img : 'img/portafolio/ser11.jpg',
            desc: ' - ("Interviews" por David Davies)'
        },{
            titulo : 'Outplacement',
            url : '/servicios/outplacement',
            text : 'Mediante la transmisión de tácticas para el análisis del mercado y la definición de los intereses, competencias y alcances del candidato, le facilitamos la búsqueda inteligente de empleo.',
            img : 'img/portafolio/ser10.jpg',
            desc: ''
        },{
            titulo : 'Consultoría',
            url : '/servicios/consultoria',
            text : 'Analizamos técnicamente sus procesos productivos e identificamos sus áreas de oportunidad prioritarias y le proponemos una intervención profesional.,',
            img : 'img/portafolio/ser1.1.jpg',
            desc: ''
        }
    ]
}

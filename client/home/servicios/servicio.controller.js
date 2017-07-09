angular.module('meanPulso').controller('ServicioController', ServicioController);

ServicioController.$inject = ['$rootScope', '$routeParams'];
function ServicioController($rootScope, $routeParams){
    var vm = this;
    var servicio = $routeParams.servicio;

    $rootScope.header = servicio;

    function getServicio (serv) {
        var servicio;
        var servicios = {
            'busqueda': function () {
                servicio = {
                    titulo : 'Búsqueda de personal',
                    url : '/servicios/busqueda',
                    text : 'Garantizamos confidencialidad, alta tecnificación y estricto apego a los estándares de calidad en cada fase del proceso.\n \n Abarcamos los niveles Ejecutivos, Mandos medios, Técnicos especializados y Personal Operativo para 30 especialidades en: \nA) Comercialización \nB) Procesos internos \nC) Recursos Humanos \nD) Finanzas y Administración',
                    img : 'img/portafolio/ser4.4.jpg',
                    desc: ''
                };
            },
            'evaluacion': function () {
                servicio = {
                    titulo : 'Evaluación de personal',
                    url : '/servicios/evaluacion',
                    text : 'Identificamos las habilidades de sus candidatos a contratar o de sus colaboradores para medir su competencia y potencial. \n Identificamos las habilidades de sus candidatos a contratar o de sus colaboradores para medir su competencia y potencial a través del manejo y solución de problemas, ejercicios vivenciales y el análisis de casos en sesiones grupales.',
                    img : 'img/portafolio/ser2.2.jpg',
                    desc: ''
                };
            },
            'subcontratacion': function () {
                servicio = {
                    titulo : 'Subcontratación de personal',
                    url : '/servicios/subcontratacion',
                    text : 'Dotamos al cliente y/o administramos los equipos de trabajo que requiera, con personas efectivas y altamente calificadas en las áreas operativa, administrativa y de servicios.\n \nNos encargamos de ayudarle a optimizar sus recursos financieros y humanos al adelgazar su estructura de organización y evitar aumentos en su nómina directa.',
                    img : 'img/portafolio/ser7.7.jpg',
                    desc: ''
                };
            },
            'administracion': function () {
                servicio = {
                    titulo : 'Administración de nómina',
                    url : '/servicios/administracion',
                    text : 'Le damos cumplimiento a las obligaciones ante el IMSS, el personal recibe puntualmente su pago, con la periodicidad acordada.\n \nEl control operativo y administrativo ejercido por nosotros y los reportes que usted recibe aseguran la confiabilidad de sus registros contables.',
                    img : 'img/portafolio/ser9.jpg',
                    desc: ''
                };
            },
            'coaching': function () {
                servicio = {
                    titulo : 'Coaching & Mentoring',
                    url : '/servicios/coaching',
                    text : 'Apoyamos el manejo de sus líderes formales y de sus colaboradores hacia un personal más calificado y efectivo. \n Nuestra intervención puede abarcar desde la identificación de sus colaboradores que poseen capacidad sobresaliente, fortaleza caracterológica y mayor potencial de desarrollo hasta la etapa en la que la persona está habilitada para asumir la responsabilidad por mejorar su desempeño en forma permanente.',
                    img : 'img/portafolio/ser5.5.jpg',
                    desc: ''
                };
            },
            'psicometrica': function () {
                servicio = {
                    titulo : 'Evaluación psicométrica',
                    url : '/servicios/psicometrica',
                    text : 'Inventariamos las aptitudes y capacidades de los candidatos y colaboradores, para proveer información amplia y oportuna de ellos. \nProveemos información amplia y oportuna de ellos, así como de sus características fuertes y sus deficiencias, para evaluarla de la forma más relevante al puesto, de una manera seria, rigurosa e imparcial.',
                    img : 'img/portafolio/ser11.jpg',
                    desc: ' - ("Interviews" por David Davies)'
                };
            },
            'outplacement': function () {
                servicio = {
                    titulo : 'Outplacement',
                    url : '/servicios/outplacement',
                    text : 'Mediante la transmisión de tácticas para el análisis del mercado y la definición de los intereses, competencias y alcances del candidato, le facilitamos la búsqueda inteligente de empleo. \nAplica a quienes han perdido su empleo y necesitan reinsertarse al mercado de trabajo o a universitarios recién egresados que buscan su primer trabajo.',
                    img : 'img/portafolio/ser10.jpg',
                    desc: '',
                    list : [
                        'Identificación de las personas que causarán baja en una empresa y/o están a punto de egresar de la Universidad.',
                        'Análisis profundo del mercado de trabajo.',
                        'Elaboración del CV, Resumen Ejecutivo y Ficha de Bolsa de Trabajo con la metodología PULSO.',
                        'Análisis y proyección de los datos en su conjunto.',
                        'Prospección al mercado de trabajo, con soluciones alternativas.','Seguimiento y Gestión de su colocación.'
                    ]
                };
            },
            'consultoria': function() {
                servicio = {
                    titulo : 'Consultoría',
                    url : '/servicios/consultoria',
                    text : 'Analizamos técnicamente sus procesos productivos e identificamos sus áreas de oportunidad prioritarias y le proponemos una intervención profesional. Nosotros abarcamos:\n \n• Procesos. Elaboración y diseño de procesos de producción, estándares de operación, balanceos de línea; capacidad de las áreas de producción, diagramas de flujo, diseños de poka yokes; cálculo de capacidad de maquinaria y personal.\n• Calidad. Inducción, aplicación y seguimiento de 5S; control, seguimiento y elaboración de FMEAS; elaboración de gráficos, estadísticas y presentaciones ejecutivas.\n • Distribución e Imagen de planta.\n \nEn recursos humanos nosotros abarcamos:\n • La definición de la estructura de organización y de la plataforma estratégica (Misión, Visión, Objetivos; Valores).\n • La creación y/o actualización de la infraestructura de RH:\n',
                    img : 'img/portafolio/ser1.1.jpg',
                    desc: '',
                    list : [
                        'Análisis de Puestos',
                        'Manuales de Organización',
                        'Manuales de Procedimientos',
                        'Evaluación del desempeño',
                        'Compensaciones',
                        'Clima laboral',
                        'Desarrollo humano',
                        'Formación de instructores',
                        'Evaluación del aprendizaje'
                    ]
                };
            }
        };

        // invoke it
        (servicios[serv] || servicios['busqueda'])();

        // return a String with chosen drink
        return  servicio;
    }

    vm.thumbnails = [
        {
            title : 'Búsqueda',
            img : 'img/portafolio/ser4.4.jpg',
            url : '/servicios/busqueda'
        },{
            title : 'Evaluación',
            img : 'img/portafolio/ser2.2.jpg',
            url : '/servicios/evaluacion'
        },{
            title : 'Subcontratación',
            img : 'img/portafolio/ser7.7.jpg',
            url : '/servicios/subcontratacion'
        },{
            title : 'Nómina',
            img : 'img/portafolio/ser9.jpg',
            url : '/servicios/administracion'
        },{
            title : 'Coaching',
            img : 'img/portafolio/ser5.5.jpg',
            url : '/servicios/coaching'
        },{
            title : 'Ev. Psicométrica',
            img : 'img/portafolio/ser11.jpg',
            url : '/servicios/psicometrica'
        },{
            title : 'Outplacement',
            img : 'img/portafolio/ser10.jpg',
            url : '/servicios/outplacement'
        },{
            title : 'Consultoría',
            img : 'img/portafolio/ser1.1.jpg',
            url : '/servicios/outplacement'
        }
    ]

    vm.servicio = getServicio(servicio);

}

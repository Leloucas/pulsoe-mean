angular.module('meanPulso').controller('CompromisoController', CompromisoController);

CompromisoController.$inject = ['$rootScope'];
function CompromisoController($rootScope){
    var vm = this;

    $rootScope.header = "Compromiso interno";

    vm.titulo = "Compromiso interno";

    vm.img = 'img/nosotros/banner03.jpg';

    vm.text = "";

    vm.itemtab = [
        {
            id : "equipos",
            title : "Equipos de trabajo",
            icon : "img/nosotros/ico11.png",
            show : false,
            description : "Formar equipos de trabajo con personas altamente competentes y confiables por su:",
            list : [
                'Capacidad general.',
                'Experiencia probada y alta competencia técnica en su área de especialidad.',
                'Capacidad de análisis.',
                'Habilidad para registrar y manejar información.',
                'Disposición real hacia el trabajo.',
                'Proactividad.',
                'Capacidad para superar esquemas convencionales y tomar decisiones creativas.',
                'Capacidad para relacionarse.',
                'Capacidad de trabajo y sentido de urgencia.',
                'Iniciativa.',
                'Fortaleza de carácter.',
                'Integridad.'
            ]
        },{
            id : "servicio",
            title : "Servicio distinguido ",
            icon : "img/nosotros/ico6.png",
            show : false,
            description : "Dar un servicio que se distinga por:",
            list : [
                'El control ejercido en el proceso de trabajo.',
                'La atención centrada en el cliente.',
                'La emisión de información concreta, objetiva y oportuna.',
                'Un valor agregado definitivamente superior a la competencia.'
            ]
        },{
            id : "remuneracion",
            title : "Remuneración",
            icon : "img/nosotros/ico2.png",
            show : false,
            description : "Remunerar competitivamente a cada persona en comparación con el mercado y, fundamentalmente, en base a sus resultados y aportaciones."
        },{
            id : "calidad",
            title : "Costos de calidad",
            icon : "img/nosotros/ico7.png",
            show : false,
            description : "Operar a los costos más bajos, sin detrimento de la calidad en la atención y servicio al cliente."
        },{
            id : "utilidad",
            title : "Margen de utilidad",
            icon : "img/nosotros/ico3.png",
            show : false,
            description : "Obtener un razonable margen de utilidad para garantizar la solvencia de nuestras Empresas."
        },{
            id : "puntualidad",
            title : "Puntualidad",
            icon : "img/nosotros/ico8.png",
            show : false,
            description : "Evitar la demora o incumplimiento de nuestras obligaciones por concepto de:",
            list : [
                'Nómina y prestaciones.',
                'Dotación de equipo.',
                'Pago a proveedores.',
                'Pago de impuestos.'
            ]
        },{
            id : "mejora",
            title : "Mejora e innovación contínua",
            icon : "img/nosotros/ico4.png",
            show : false,
            description : "Mejorar e innovar continuamente la infraestructura tecnológica y el servicio al cliente para garantizar nuestra permanencia en el mercado y asegurar el crecimiento y diversificación de nuestras Empresas."
        },{
            id : "calidad",
            title : "Calidad de vida",
            icon : "img/nosotros/ico9.png",
            show : false,
            description : "Fomentar la calidad de vida de nuestros colaboradores."
        },{
            id : "capacidad",
            title : "Capacidad de futuro",
            icon : "img/nosotros/ico5.png",
            show : false,
            description : 'Desarrollar en nuestros colaboradores su “Capacidad de Futuro” para que no sólo se comprometan con la subsistencia de nuestras Empresas como fuente actual de empleo y con los tiempos presentes, sino que sean conscientes de la necesidad de solidarizarnos con las generaciones venideras. Así aumentaremos las posibilidades de que la Organización nos trascienda y permanezca indefinidamente.'
        },{
            id : "solucion",
            title : "Solución de problemas",
            icon : "img/nosotros/ico12.png",
            show : false,
            description : "Enfatizar el antes por encima del después en cuanto a la atención y solución de los problemas. Nuestro enfoque no es de control posterior sino de prevención e innovación."
        }
    ]

}

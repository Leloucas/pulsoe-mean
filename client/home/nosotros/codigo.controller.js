angular.module('meanPulso').controller('CodigoController', CodigoController);

CodigoController.$inject = ['$rootScope'];
function CodigoController($rootScope){
    var vm = this;

    $rootScope.header = "Código de conducta";

    vm.titulo = "Código de conducta";

    vm.img = 'img/nosotros/banner02.jpg';

    vm.text = "La Ética de nuestros colaboradores es la cualidad más importante en el desempeño de sus labores. Al ponerla en práctica cotidianamente demuestra e inspira confianza; fortalece su imagen personal y propicia que en su entorno prevalezca un clima de tranquilidad, al saber que contamos con un individuo íntegro, a quien nuestro cliente le puede confiar cualquier recurso.";

    vm.itemtab = [
        {
            id : "confidencialidad",
            title : "Confidencialidad",
            icon : "img/nosotros/ico11.png",
            show : false,
            description : "Guarde celosamente los secretos que le sean confiados. Sea prudente en su conversación en y fuera de sus labores. No dé información indiscriminadamente. Reserve para sí mismo y para las personas indicadas los documentos y asuntos de carácter privado."
        },{
            id : "disciplina",
            title : "Disciplina",
            icon : "img/nosotros/ico12.png",
            show : false,
            description : "Cumpla al pie de la letra las órdenes, comisiones e instrucciones de su cliente y Coordinador, pero déle un valor agregado a su servicio para que sea óptimo. Propicie y mantenga en su trabajo un ambiente cordial, sin desconocer la autoridad ni relajar las normas y disposiciones implantadas."
        },{
            id : "honor",
            title : "Honor",
            icon : "img/nosotros/ico13.png",
            show : false,
            description : "Respétese y respete a los demás. Sea muy celoso de su reputación. Evite acciones que usted mismo reprobaría. Reconozca y exija reconocimiento a los límites en sus relaciones para no transgredir los derechos y valores de las personas. No justifique sus errores culpando a otros."
        },{
            id : "honradez",
            title : "Honradez",
            icon : "img/nosotros/ico14.png",
            show : false,
            description : "Hágase acreedor de la buena opinión, aprecio y respeto de sus clientes en base a su rectitud, capacidad y méritos. Piense y proceda de manera congruente en su trabajo y en su vida privada."
        },{
            id : "integridad",
            title : "Integridad",
            icon : "img/nosotros/ico17.png",
            show : false,
            description : "Sea claro y justo en su proceder. No accione con ventaja sobre los demás. Que nadie dude de su probidad, sensatez y honestidad. No genere ni difunda rumores. Razone y actúe inteligentemente. Sea consciente de su conducta."
        },{
            id : "lealtad",
            title : "Lealtad",
            icon : "img/nosotros/ico15.png",
            show : false,
            description : "Cumpla fielmente con sus compromisos y obligaciones; condúzcase con propiedad y buen juicio. Que sus decisiones y acciones nunca sean contrarios a la verdad y a los intereses de su empleador. No oculte acciones reprobables ni altere la información para que no haya dudas de su fidelidad."
        },{
            id : "moral",
            title : "Moral",
            icon : "img/nosotros/ico16.png",
            show : false,
            description : "Que su vida en general se base en normas de conducta positivas, para sí mismo y para los demás. No incurra en actos que degraden a su persona."
        }
    ]
}

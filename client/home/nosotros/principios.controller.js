angular.module('meanPulso').controller('PrincipiosController', PrincipiosController);

PrincipiosController.$inject = ['$rootScope'];
function PrincipiosController($rootScope){
    var vm = this;

    $rootScope.header = "Principios y Convicciones";

    vm.titulo = "Principios y Convicciones";

    vm.img = 'img/nosotros/banner01.jpg';

    vm.text = "";

    vm.itemtab = [
        {
            id : "participacion",
            title : "Participación y compromiso",
            show : false,
            description : "Concebimos que la existencia, la historia y el futuro de la persona están íntimamente ligados a su participación y compromiso voluntarios con algún tipo de Organización."
        },{
            id : "actividad",
            title : "Actividad económica",
            show : false,
            description : "La actividad económica, manifestada en una empresa socialmente útil, es el medio idóneo para integrar, desarrollar y dignificar a las personas, al permitirles proyectar su individualidad y comprometerlas con el progreso comunitario y humano."
        },{
            id : "trabajo",
            title : "Trabajo",
            show : false,
            description : "El trabajo, en todas sus modalidades socialmente válidas, es el medio ideal para darle sentido y trascendencia a la vida humana."
        },{
            id : "satisfaccion",
            title : "Satisfacción de necesidades",
            show : false,
            description : "La actividad empresarial requiere concentrarse en los objetivos y actividades tendientes a satisfacer necesidades y expectativas concretas del cliente. Así es como esperamos conseguir su reconocimiento, preferencia y respeto."
        },{
            id : "valores",
            title : "Valores humanos",
            show : false,
            description : "Nuestras Empresas tendrán sentido y valor superior en la medida que logremos nuestros objetivos económicos en armonía con el respeto y fomento a los valores humanos universales, inherentes a cada individuo."
        },{
            id : "individuales",
            title : "Valores individuales",
            show : false,
            description : "Reclamamos participación responsable, rendimiento superior y conducta madura de la persona al integrarse armoniosamente a nuestro equipo de trabajo."
        },{
            id : "recursos",
            title : "Recursos y objetivos",
            show : false,
            description : "El aprovechamiento óptimo de los recursos y el logro de nuestros objetivos económicos son una responsabilidad conjunta. Exigen superar el individualismo y adoptar una visión empresarial."
        },{
            id : "fidelidad",
            title : "Fidelidad y honestidad",
            show : false,
            description : "La fidelidad y honestidad incuestionables son evidencia de la capacidad de nuestros colaboradores para vincularse y comprometerse con otras personas, con su equipo de trabajo, con nuestra Organización y con los intereses del cliente."
        },{
            id : "creatividad",
            title : "Creatividad e individualidad",
            show : false,
            description : "Estimulamos la creatividad y canalizamos las ideas espontáneas. La necesidad de trabajar de cada uno se ve enriquecida por las oportunidades que ofrecemos para aportar y concretar ideas propias. Hay total seguridad de que no marginamos ni relegamos a nadie."
        },{
            id : "compromiso",
            title : "Responsabilidad y compromiso",
            show : false,
            description : "El clima organizacional en nuestras Empresas está influido por cada uno de nosotros. Por ello, apreciamos la actuación responsable y la actitud de compromiso con el presente y futuro de la Organización."
        },{
            id : "contexto",
            title : "Contexto Empresarial",
            show : false,
            description : "Buscamos que el contexto de nuestras Empresas dignifique a la persona, permitiéndole atender y trascender sus satisfactores económicos y materiales."
        },{
            id : "actitud",
            title : "Actitud Empresarial",
            show : false,
            description : "Los retos en el trabajo y en nuestra relación son lo ordinario. Evitamos que la persona se sienta premiada o exija reconocimiento por cumplir con sus responsabilidades ordinarias. Mas bien, premiamos lo extraordinario y hacemos que cada uno identifique, acepte y persiga metas superiores."
        },{
            id : "independencia",
            title : "Independencia",
            show : false,
            description : "Nos interesamos por la persona y la apoyamos, pero evitamos la dependencia y el sometimiento. Responsabilizamos a cada uno de sus obligaciones y compromisos personales, laborales y sociales. Más aún, exigimos una actuación realista y madura, propia de un adulto."
        },{
            id : "relacion",
            title : "Relación laboral",
            show : false,
            description : "No compramos la fidelidad; ello vulneraría la dignidad de la persona. Enfatizamos la actuación sobresaliente de cada uno, anteponiendo el sentido de orgullo personal, por encima de la obligación derivada de una relación laboral estrictamente legal."
        }
    ]

}

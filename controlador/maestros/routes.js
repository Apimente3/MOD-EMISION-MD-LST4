
const controller = require('./controllers')

module.exports = ({router}) => {

    /*Utilizado en el registro de la solicitud*/
    router.get('/tipo-documento', controller.tipo_documento);
    router.get('/tipoproyecto', controller.tipoproyecto);
    router.get('/tipoinfraestructura', controller.tipoinfraestructura);
    router.get('/fase', controller.fase);
   
    
    /*Utilizado en el registro del integarnte*/
    router.get('/tipointegrante', controller.tipointegrante);
    router.get('/entidades_consulta', controller.entidades_consulta);
    router.get('/ubigeo', controller.ubigeo);

    router.get('/tipo_propietario', controller.tipo_propietario);
    router.get('/condicion_propietario', controller.condicion_propietario);
    router.get('/organo_solicitante', controller.organo_solicitante);
    
   

}
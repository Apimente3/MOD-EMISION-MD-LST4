const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    router.post('/predio', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.create);
    router.get('/predios', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.listarPredios);
    router.get('/predios-proyecto', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.getPrediosbyProyecto);
    router.get('/obtenerPredio/:codigo', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.obtenerPredio);
    router.post('/predios-save', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.save);
    router.post('/save_datos_predio', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.save_datos_predio);
    router.post('/save_ubicacion_predio', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.save_ubicacion_predio);
    
    router.get('/datosgenerales/:predio_id', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.obtenerDatosGenerales);
    router.get('/obtener_ubicacion_predio/:predio_id', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.obtener_ubicacion_predio);
    /*Obtiene los Propietarios del Predio*/
    router.get('/obtener_sujetopasivo/:codigo_predio', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.obtener_sujetopasivo);
   


}
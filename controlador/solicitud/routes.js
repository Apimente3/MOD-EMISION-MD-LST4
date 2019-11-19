const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles');
const {AccesoRoles} = require('../../middlewares/roleAccess');
const {validateToken} = require('../../middlewares/auth');
const {uploadarchivo, uploadarchivoMultiple} = require('../../middlewares/UploadFile');
const controller = require('./controllers')
module.exports = ({router}) => {

    /*para realizar la busqueda de las solicitudes mediante la fecha */
    router.get('/buscarsolicitud',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.busqSolicitud);
    router.get('/buscarsolicitud-proyecto',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.busquedaSolictudbyProyecto);
    router.get('/datos-solicitud',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.datosSolicitud);
    router.get('/drpsolicituds',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.drpsolicituds);
    router.get('/drpsolicituds-proy',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.drpsolicitudsbyProy);
    /*Registra un trabajador*/
    router.post('/solicitud', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.create);
    /*Delete solicitud*/
    router.delete('/solicitud', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.deleted);
    router.put('/update-polygono', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.updatePolygono);
    router.post('/uploadsolicitud', validateToken, AccesoRoles([ADMIN, COORDINADOR]), uploadarchivo, controller.uploadFile);
    //router.post('/uploadsolicitudmultiple', validateToken, AccesoRoles([ADMIN, COORDINADOR]), uploadarchivoMultiple, controller.uploadFileMultiple);


}
const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles');
const {AccesoRoles} = require('../../middlewares/roleAccess');
const {validateToken} = require('../../middlewares/auth');
const {uploadarchivo, uploadarchivoMultiple} = require('../../middlewares/UploadFile');
const controller = require('./controllers')
module.exports = ({router}) => {

    /*para realizar la busqueda de las solicitudes mediante la fecha */
   // router.get('/proyectos',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.busqSolicitud);

    /*Registra un trabajador*/
    router.post('/proyecto', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.save);
    /*Delete solicitud*/
    router.delete('/proyecto', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.deleted);
 


  

}
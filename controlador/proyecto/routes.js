const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles');
const {AccesoRoles} = require('../../middlewares/roleAccess');
const {validateToken} = require('../../middlewares/auth');
const {uploadarchivo, uploadarchivoMultiple} = require('../../middlewares/UploadFile');
const controller = require('./controllers')
module.exports = ({router}) => {

    /*para realizar la busqueda de las solicitudes mediante la fecha */
    router.get('/list-proyectos',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.listarProyectos);
    router.get('/drpProyectos',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.drpProyectos);
    /*Resumen Party*/
    router.get('/resumen-proyectos',validateToken,  AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.resumenProyectos);
    /*Registra un trabajador*/
    router.post('/saveproyecto', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.save);
    /*Delete solicitud*/
    router.delete('/deleteproyecto', validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR]), controller.deleted);
 


  

}
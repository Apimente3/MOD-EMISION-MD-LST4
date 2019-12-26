const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    /*Registra un trabajador*/
    /*Meotdos get*/
    router.get('/equipos', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.busquedaEquipos);
    router.get('/details-equipo', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.detailsEquipo);
    router.get('/equipobyProy', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.equipobyProy);
    
    router.post('/equipo', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.create);
    router.post('/add-integrante', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.addIntegrante);
    router.post('/eliminarintegrante', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.delIntegrante);

 


}
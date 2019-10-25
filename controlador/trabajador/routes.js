const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')
module.exports = ({router}) => {

    /*Lista todos los Brigasdistas*/
    router.get('/trabajadors',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.busquedaTrabajadores);
    router.get('/responsables',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.getResponsables);

    router.get('/brigadistas',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.getBrigadistas);
    /*Obtiene un trabajador por id*/
    router.get('/trabajadors/:id',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.getone);
    /*Registra un trabajador*/
    router.post('/trabajadors',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.create);
    /*Edita un Brigadista*/
    router.put('/trabajadors/:id',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.update);
    router.put('/trabajadors/:id',validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.update);


}
const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {
    /*Lista todos los Brigasdistas*/
    router.get('/gettrabajadores',validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.getTrabajadores);

    /*Obtiene un trabajador por id*/
    router.get('/brigada/:id',validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.getone);
    /*Registra un trabajador*/
    router.post('/brigada', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.create);
    /*Edita un Brigadista*/
    router.put('/brigada/:id', /* auth.validateToken,*/ controller.update);


}
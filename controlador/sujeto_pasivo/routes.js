const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    router.post('/save_propietario', validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.save_propietario);
    router.get('/list_propietario', validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.list_propietario);
    router.get('/list_propietario_predios', controller.list_propietario_predio);
  
   


}
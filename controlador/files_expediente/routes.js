const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    router.post('/save_filesexpediente', validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.save);
    router.get('/list_filesexpediente', validateToken,AccesoRoles([ADMIN,COORDINADOR,BRIGADISTA]), controller.list);
  
   


}
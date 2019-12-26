const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    router.post('/expediente', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.save);
    router.delete('/expediente', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.deleted);
    router.get('/expedientespredio', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.getExpedientebyPredio);
    router.get('/expedientesSearch', validateToken,AccesoRoles([ADMIN,COORDINADOR]), controller.expedienteSearch);
    
    
    
    
    
  
   


}
const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {
    

    router.get('/adquisicion_predial',validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.getExpbyProyecto);
    router.post('/save_adquisicion_predial',validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.save);
    /*Eliminar la adquicicion predual*/
    router.delete('/delete_adquisicion_predial',validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.deleted);
    
}
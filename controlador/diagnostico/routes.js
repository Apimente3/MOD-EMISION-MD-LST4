const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {

    /*Registra un consulta_entidades*/
    router.post('/consulta_entidades', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.save_consulta_entidades);

    /*Registra un consulta_entidades*/
    router.post('/inspeccion_campo', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.save_inspeccion_campo);

    /*Registra un consulta_entidades*/
    router.post('/informe_diagnostico', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.save_informe_diagnostico);

    router.get('/list_diagnostico', validateToken,AccesoRoles([ADMIN,BRIGADISTA,COORDINADOR]), controller.listDiagnostico);


}
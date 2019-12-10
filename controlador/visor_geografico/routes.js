const {ADMIN,BRIGADISTA,COORDINADOR}= require('../../config/roles')
const {AccesoRoles}=require('../../middlewares/roleAccess')
const {validateToken}=require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {
    router.get('/mapa-tematico', controller.mapa_tematico);
    router.get('/kpi-visor', controller.kpi_visor);
    router.get('/avance_detallado', controller.avance_detallado);
   
    
}
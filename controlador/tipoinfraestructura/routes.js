const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles')
const {AccesoRoles} = require('../../middlewares/roleAccess')
const {validateToken} = require('../../middlewares/auth')
const controller = require('./controllers')

module.exports = ({router}) => {
    router.get('/drptipoinfraestructura', validateToken, AccesoRoles([ADMIN, COORDINADOR, BRIGADISTA]), controller.drp_tipoinfraestructura);
}
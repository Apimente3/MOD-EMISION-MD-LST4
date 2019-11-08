const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles');
const {AccesoRoles} = require('../../middlewares/roleAccess');
const {validateToken} = require('../../middlewares/auth');
const {uploadarchivo, uploadarchivoMultiple} = require('../../middlewares/UploadFile');
const controller = require('./controllers')
module.exports = ({router}) => {

    router.get('/obtener_poligono_proyecto'/*, validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR])*/, controller.obtener_poligono_proyecto);
    router.get('/obtener_poligono_predio'/*, validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR])*/, controller.obtener_poligono_predio);
    router.get('/obtener_poligono_interferencia'/*, validateToken, AccesoRoles([ADMIN, BRIGADISTA, COORDINADOR])*/, controller.obtener_poligono_interferencia);


}
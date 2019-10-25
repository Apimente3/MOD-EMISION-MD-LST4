const {ADMIN, BRIGADISTA, COORDINADOR} = require('../../config/roles');
const {AccesoRoles} = require('../../middlewares/roleAccess');
const {validateToken} = require('../../middlewares/auth');
const {uploadarchivo, uploadarchivoMultiple} = require('../../middlewares/UploadFile');
const controller = require('./controllers')
module.exports = ({router}) => {
    
    router.post('/fileupload', validateToken, AccesoRoles([ADMIN, COORDINADOR]), uploadarchivoMultiple, controller.uploadFileMultiple);
}
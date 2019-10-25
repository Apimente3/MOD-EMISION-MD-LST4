
const controller=require('./controllers')
module.exports = ({router}) => {



    /**
     * @swagger
     * paths:
     *    /proceso_2:
     *       post:
     *          security:
     *             - Bearer: []
     *          tags:
     *             - Predios
     *          description: Permite el guardar el registro de un predio
     *          consumes:
     *             - application/x-www-form-urlencoded
     *          parameters:
     *             - in: formData
     *               name: denominacion
     *               type: string
     *               description: Denominacion del predio
     *               required: true
     *             - in: formData
     *               name: codigo
     *               type: string
     *               description: codigo del predio
     *               required: true
     *             - in: formData
     *               name: expediente
     *               type: string
     *               description: Expediente del predio
     *               required: true
     *             - in: formData
     *               name: expediente
     *               type: string
     *               description: Expediente del predio
     *               required: true
     *
     *             - in: formData
     *               name: clave
     *               type: string
     *               description: clave del Trabajador de DDP a loguearse
     *               required: true
     *          responses:
     *             '201':
     *                description: OK
     *             '400':
     *                description: Argumentos no encontrados
     *
     */
    router.post('/proceso_9',/* auth.validateToken,*/ controller.save);


}
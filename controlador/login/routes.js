const auth = require("./../../middlewares/auth");
const controller = require('./controllers')
module.exports = ({router}) => {


    /**
     * @swagger
     * schemes:
     *   - http
     *   - https
     * securityDefinitions:
     *   Bearer:
     *     type: apiKey
     *     name: authorization
     *     in: header
     */


    /**
     * @swagger
     * paths:
     *    /login:
     *       post:
     *          security:
     *             - Bearer: []
     *          tags:
     *             - Accesos
     *          description: Permite el inicio de session de un trabajador de la DDP
     *          consumes:
     *             - application/x-www-form-urlencoded
     *          parameters:
     *             - in: formData
     *               name: dni
     *               type: string
     *               description: DNI del Trabajador a loguearse
     *               required: true
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
    router.post('/login', /* auth.validateToken,*/ controller.login);

    router.post('/quiensoy', /* auth.validateToken,*/ controller.quienSoy);


}
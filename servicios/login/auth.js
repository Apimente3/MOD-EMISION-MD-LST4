const models = require('../../models');

const bcrypt = require('../../infra/crypto/bcrypt')
const tokenInfra = require('./../../infra/jwt/tokenManager');


module.exports = {
    /**
     Devuelve los datos de un usuario como trabajador después de comprobar que su email y contraseña coinciden con los guardados en la base de datos.
     Puede devolver un Brigadista, Coordinador y Administrador.
     @param {string} dni
     @param {string} password
     @returns {Promise<{user: any, token: any}>}
     */
    login, getRoleUser, whoSoy
};

/*Implementado la funcion del login de un transportista*/
async function login(dni, password) {
    try {
        let trabajador = await models.profesional_ddp.scope(null).findOne({
            where: {
                dni: dni
            }
        });

        if (!trabajador) {
            throw {
                error: new Error("DNI no encontrado: " + dni),
                message: "DNI de trabajador no encontrado",
                status: 400
            };
        }
        //let compare = (password=== trabajador.contrasenia);
        let compare = await bcrypt.compare(password.trim(), trabajador.contrasenia);
        if (!compare) {
            throw {
                error: new Error("La clave no coeencide con la del Usuario: " + dni),
                message: "La clave proporcionada coencide con del usuario",
                status: 400
            };
        }
        let token = await tokenInfra.createToken({id:trabajador.id,rol:trabajador.rol});
        trabajador.contrasenia = '*************';
        trabajador.rol = getRoleUser(trabajador.rol)

        return {
            trabajador,
            token
        };
    }
    catch (err) {
        throw err;
    }
}


/*Implementado la funcion del login de un transportista*/
async function whoSoy(token) {
    try {
        console.log('***********TOKEN**************')
        console.log(token)
        if (!token) {
            throw {
                error: new Error(" Token no encontrado "),
                message: "Token de trabajador no encontrado",
                status: 400
            };
        }
        let id = await tokenInfra.quiensoy(token);
        /*Desencroptar token*/
        return id;
    }
    catch (err) {
        throw err;
    }
}


function getRoleUser(idrol) {

    let role;
    if (idrol == 1) {
        role = 'Administrador'
    }
    if (idrol == 2) {
        role = 'Coordinador'
    }
    if (idrol == 3) {
        role = 'Brigadista'
    }
    return role;

}
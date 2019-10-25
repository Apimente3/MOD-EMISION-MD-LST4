'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
//const config = require('../../config').parameterConfig
const minutos = (24*60);
const JWT_TRUSTED_CLIENT_SECRET='RENATOMINANO'

function createToken(data) {
  
    const payLoad = {
        id: data.id,
        rol: data.rol, //campo numerico
        fechaCreacion: moment().unix(),
        fechaExpiracion:  moment().add(minutos, 'minutes').unix()
    }
    return jwt.encode(payLoad, JWT_TRUSTED_CLIENT_SECRET)
}

/*Funcion de decodificacion del token por entender*/
function decodeToken(token) {
  return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token,JWT_TRUSTED_CLIENT_SECRET);
            resolve(payload)
        }
        catch (error) {
            reject({
                status: 500,
                message: error
            })
        }
    })
    
}


function quiensoy(token) {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token,JWT_TRUSTED_CLIENT_SECRET)

            if (payload.fechaExpiracion <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Token a expirado'
                })
            }
            else{

                resolve(payload.id)
            }
        }
        catch (error) {
            reject({
                status: 500,
                message: error
            })
        }
    })

}



module.exports = {
    createToken,
    decodeToken,
    quiensoy
}

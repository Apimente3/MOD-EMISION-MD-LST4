const config = require('../serverConfig/config.js');
const jwt = require('jsonwebtoken');
const models = require('../models');
const moment = require('moment');
const {decodeToken} = require('./../infra/jwt/tokenManager');

module.exports = {
    validateToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
            
        

            if (token) {
                const decoded = await decodeToken(token);
                req.userId = decoded.id;
                req.body.usuaregistra_id=decoded.id;
                if (decoded.fechaExpiracion <= moment().unix()) {
                    return next({
                        error: "Token expirado",
                        status: 401,
                        message: "Token expirado"
                    });
                }
                else {
                    next();
                }
            }
            else{
                return next({
                    error: "Token no encontrado",
                    status: 401,
                    message: "Token no encontrado"
                });
            }
        } catch (err) {
            if (err) {
                return next({
                    error: err,
                    status: 401,
                    message: "Ha habido un error"
                });
            }
        }
    },
    validateTokenAdmin: async (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
        if (token) {
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    return next({
                        error: (err instanceof Error) ? err : JSON.stringify(err),
                        status: 401,
                        message: "Ha habido un error"
                    });
                }
                req.userId = decoded.sub;
                let usuario = await models.Usuarios.findById(req.userId);
                if (usuario.tipo !== 2) {
                    return next({
                        error: "Token inválido",
                        status: 403,
                        message: "Acceso restringido"
                    });
                }
                next();
            });
        } else {
            return next({
                error: "Token no encontrado",
                status: 401,
                message: "Acceso restringido"
            });
        }
    },
    validateTokenCert: async (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
        if (token) {
            jwt.verify(token, config.secret_cert, async (err, decoded) => {
                if (err) {
                    return next(err);
                }
                if (decoded.sub != req.body.id) return next({
                    error: "Token inválido",
                    status: 403,
                    message: "Acceso restringido"
                });
                next();
            });
        } else {
            return next({
                error: new Error("Token no encontrado"),
                status: 401,
                message: "Acceso restringido"
            });
        }
    },
};

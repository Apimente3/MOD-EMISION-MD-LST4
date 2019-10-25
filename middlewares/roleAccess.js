const {decodeToken} = require('../infra/jwt/tokenManager');

function AccesoRoles(roles) {
    return async function (req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
        if (token) {
            const decoded = await decodeToken(token);
            req.rol = decoded.rol;
            if (roles.includes(req.rol)) {
                next();
            }
            else {
                return next({
                    error: "Sin Acceso",
                    message: "SIN_PERMISO_ROL",
                    status: 401
                });
            }
        } else {
            return next({
                error: "Token no encontrado",
                message: "Acceso restringido",
                status: 401
            });
        }
    }
}


module.exports = {
    AccesoRoles
}
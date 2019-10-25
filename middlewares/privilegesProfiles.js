const moment = require("moment");
const jwtInfra = require('../infra/jwt/jwt');
const { getTiposPrivilegios } = require('./../servicios/auth/privilegios/perfiles');
const { ProductoToken } = require('./../domain/ValueObjects/PayloadToken');


const validateAccessProfile = async (req, res, next) => {
   try {
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
      const lowestAccessLevel = getLowestAccessLevel(req.params.id);
      if (token) {
         const decoded = await jwtInfra.verifyToken(token);
         req.authPayload = decoded;
         req.role = decoded.data.role;
         const profileId = req.params.id;
         const profileRequested = decoded.data.profiles.find(profileIdAdquirido => profileIdAdquirido.profesionalId == profileId);
         if (profileRequested) {
            //si el profile no ha expirado (la compra del perfil)
            const isExpired = moment(profileRequested.expirationDate).isBefore(new Date(), "day");
            if (isExpired) {
               req.profile = {
                  profesionalId: profileRequested.profesionalId,
                  accessLevel: profileRequested.accessLevel
               };
            } else {
               req.profile = lowestAccessLevel;
            }
         } else {
            if (profileId == decoded.sub) {
               req.profile = getHighestAccessLevel(profileId);
               req.role = 'administrator';
            }
            else
               req.profile = lowestAccessLevel;
         }
         next();
      } else {
         req.profile = lowestAccessLevel;
         next();
      }
   } catch (err) {
      return next(err);
   }
};
//se utiliza en la búsqueda
const validateAccessMultipleProfiles = async (req, res, next) => {
   try {
      const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
      if (token) {
         const decoded = await jwtInfra.verifyToken(token);
         if (decoded.data && decoded.data.profiles && decoded.data.profiles.length > 0) {
            req.profiles = decoded.data.profiles
               .filter(element => moment(element.expirationDate).isBefore(new Date(), "day"))
               .map(profileAdquirido => {
                  return {
                     profesionalId: profileAdquirido.profesionalId,
                     accessLevel: profileAdquirido.accessLevel
                  };
               });
            req.authPayload = decoded;
         } else req.profiles = null;
         next();
      } else {
         req.profiles = null;
         next();
      }
   } catch (error) {
      return next(error);
   }
};

module.exports = {
   validateAccessProfile,
   validateAccessMultipleProfiles
};

/**
 * @param {number | string} userId
 * @return {ProductoToken}
 */
const getLowestAccessLevel = (userId) => {
   const tiposPrivilegios = getTiposPrivilegios();
   //@ts-ignore
   const isAnonimousId = isNaN(userId);
   const lowestAccessLevel = isAnonimousId ? tiposPrivilegios.STATISTICS.NONE : tiposPrivilegios.IDENTITY.NONE;

   return { profesionalId: userId, accessLevel: lowestAccessLevel, expirationDate: undefined };
};
/**
 * @param {number} userId
 * @return {ProductoToken}
 */
const getHighestAccessLevel = (userId) => {
   const tiposPrivilegios = getTiposPrivilegios();
   return { profesionalId: userId, accessLevel: tiposPrivilegios.IDENTITY.ALL, expirationDate: undefined };
}
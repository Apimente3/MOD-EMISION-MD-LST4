const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../serverConfig/config');
const { PayloadToken, ProductoToken } = require('./../../domain/ValueObjects/PayloadToken');

const mesInSegundos = (1 * 1 * 1 * 60);



const createToken = async (id) => {
   const token = await newToken(id, mesInSegundos, config.secret);
   return token;
};
/**
* @param {number} id
* @param {{profiles:ProductoToken[], role: string}} [data]
* @return {Promise<PayloadToken>} 
*/
const createTokenWithData = async (id, data) => {
   const token = await newToken(id, mesInSegundos, config.secret, data);
   return token;
};
const createTokenExpress = async (id) => {
   const token = await newToken(id, 30, config.secret_cert);
   return token;
};
/**
 * @param {string} token
 * @return {Promise<PayloadToken>};
 */
const verifyToken = async (token) => {
   return new Promise((res, rej) => {
      jwt.verify(token, config.secret, {
         ignoreExpiration: false
      }, async (err, decoded) => {
         if (err) return rej(err);
         res(parseToken(decoded));
      });
   });
};

module.exports = {
   createToken, createTokenWithData, createTokenExpress, verifyToken
};
/**
 * parse payload del token al object PayloadToken
 * @param {any} rawPayloadToken 
 * @return {PayloadToken}
 */
const parseToken = (rawPayloadToken) => {
   const {
      sub,
      iat,
      exp,
      d: data,
   } = rawPayloadToken;
   let payload = {
      sub, iat, exp, data
   };
   if (data) {
      data.profiles = data.c;
      data.role = parseRoleToken(data.r);
      const { c, r, ...cleanData } = data;
      payload.data = cleanData;
   }

   return new PayloadToken(payload);
};

const newToken = async (id, expirationTimeInSeconds, secret, data = { profiles: [] }) => {
   const payload = {
      sub: id,
      iat: moment().unix(),
      d: {
         c: data.profiles,
         r: parseRolePayload(data.role)
      }
   };
   return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, {
         expiresIn: expirationTimeInSeconds
      }, (err, token) => {
         if (err) return reject(err);
         resolve(token);
      });
   });
};

/**
 * 
 * @param {number} rawRole 
 * @return {string}
 */
const parseRoleToken = (rawRole) => {
   let rol;
   switch (rawRole) {
      case 2: rol = 'administrator'; break;
      case 1: rol = 'client'; break;
      case 0: rol = 'lawyer'; break;
      default: rol = 'lawyer';
   }
   return rol;
};
/**
 * 
 * @param {string} payloadRole 
 * @param {number}
 */
const parseRolePayload = (payloadRole) => {
   let rol;
   switch (payloadRole) {
      case 'administrator': rol = 2; break;
      case 'client': rol = 1; break;
      case 'lawyer': rol = 0; break;
      default: rol = 0;
   }
   return rol;
};

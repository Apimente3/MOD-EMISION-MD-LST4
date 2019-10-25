// const env = process.env.NODE_ENV || 'development';
let logger = require('./winston.js');

module.exports = (err, req, res, next) => {
   if (err instanceof Error) {
      const errAux = err;
      err = {};
      err.error = errAux;
   } else if (typeof err.error === 'string' || !err.error) {
      err.error = new Error(err.error);
   }
   const code = err.error.code;
   if (code) {
      if (code === 'LIMIT_FILE_SIZE') {
         err.message = 'Archivo demasiado grande. Máximo 5MB';
         err.status = 400;
      } else if (code === 'JWT_MALFORMED') {
         err.message = 'SIN_PERMISOS_RELOGIN';
         err.status = 401;
      }
   }
   const status = ((err.status >= 100 && err.status < 600)) ? err.status : 500;
   if (status >= 400 && status < 500) logger.warn(err.error.stack);
   else if (status >= 500 && status < 600) logger.error(err.error.stack);
   const msg = status >= 500 ? 'Ha habido un error' : err.message || err.error.message || 'Ha habido un error';
   return res.status(status).send(msg);
};

const axios = require('axios');
const config = require('../config/config.js');

const querystring = require('querystring');

module.exports = {
  verify: async (req, res, next) => {
    try {
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify',
        querystring.stringify({
          secret: config.recaptcha_key,
          response: req.body.captchaResponse
        }));
      if (!response.data.success) {
        return next({
          error: new Error('Google no pudo verificar el captcha'),
          status: 500
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};

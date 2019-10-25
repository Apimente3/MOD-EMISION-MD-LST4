const crypto = require('crypto'),
   algorithm = 'aes128',
   password = 'KLAS$$_*çÇasd"$%/&%$fAEFSDf1_*^!/4352adsfsQr';

const encrypt = async (plainText) => {
   return new Promise((res, rej) => {
      try {
         var cipher = crypto.createCipher(algorithm, password);
         var crypted = cipher.update(plainText, 'utf8', 'hex');
         crypted += cipher.final('hex');
         res(crypted);
      } catch (error) {
         rej(error);
      }
   });
};

const decrypt = async (cryptText) => {
   return new Promise((res, rej) => {
      try {
         var decipher = crypto.createDecipher(algorithm, password);
         var dec = decipher.update(cryptText, 'hex', 'utf8');
         dec += decipher.final('utf8');
         res(dec);
      } catch (error) {
         rej(error);
      }
   });
};

module.exports = {
   encrypt,
   decrypt
};
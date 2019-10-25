const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 10;

const encrypt = async (contrasenia) => {
    return new Promise((res, rej) => {
        try {
            bcrypt.hash(contrasenia, BCRYPT_SALT_ROUNDS)
                .then(hashpassword => {
                    res(hashpassword)
                })

        } catch (error) {
            rej(error);
        }
    });
};


const compare = async (contrasenia,hash) => {
    return new Promise((res, rej) => {
        try {
            bcrypt.compare(contrasenia, hash, function(err, result) {
                if (err) { rej (err); }
                res(result)
            });

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
    decrypt,
    compare
};  
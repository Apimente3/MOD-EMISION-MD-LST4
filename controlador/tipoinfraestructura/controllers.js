//@ts-check
"use strict";

const models = require('../../models');
const predioService = require('./../../servicios/predios/predios');
const Op = models.Sequelize.Op;

module.exports = {
    drp_tipoinfraestructura
};

/*Listado de solictud de los predios*/
async function drp_tipoinfraestructura(req, res, next) {
    try {
        let list = await models.tipoinfraestructura.findAll({
            attributes: ['id', 'denominacion']
        });
        return res.status(200).send(list);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

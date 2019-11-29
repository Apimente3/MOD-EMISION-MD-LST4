//@ts-check
"use strict";

const models = require('../../models');

module.exports = {
    save,
    list
};


/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        let object = await models.files_expediente.findOne({
            where: {
                codigo_expediente: req.body.codigo_expediente
            }
        });
        if (object != null) {
            let obj = {...object.dataValues, ...req.body}
            for (const prop in obj) {
                object[prop] = obj[prop]
            }
            object.usuaregistra_id = req.userId;
            await object.save({t});
        } else {
            object = await models.files_expediente.create({...req.body, usuaregistra_id: req.userId}, {t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


/*Listado de solictud de los predios*/
async function list(req, res, next) {
    try {
        let response = await models.files_expediente.findOne({
            where: {
                codigo_expediente: req.query.codigo_expediente
            }
        });
        return res.status(200).send(response);
    }
    catch (err) {
        return next(err);
    }
}

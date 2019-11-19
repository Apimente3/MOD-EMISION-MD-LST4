//@ts-check
"use strict";

const models = require('../../models');
const predioService = require('./../../servicios/predios/predios');
const Op = models.Sequelize.Op;

module.exports = {
    save,
    deleted
};


/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */

async function save(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let object = await models.expedientes.findOne({
            where: {
                predio_id: req.body.predio_id
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
            object = await models.expedientes.create(req.body, {t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function deleted(req, res, next) {
    const t = await models.sequelize.transaction();
    try {

        let object = await models.expedientes.findOne({
            where: {
                id: req.body.id
            }
        });

        if (!object) {
            throw {
                error: "No se encontro la Peticion de Solicitud Predial.",
                message: "No se encontro la Peticion de Solicitud Predial.",
                status: 400
            }
        }
        object.observacion = req.body.observacion;
        object.usuaregistra_id = req.userId;
        await object.save({t});
        await object.destroy({t});
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


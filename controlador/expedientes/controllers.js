//@ts-check
"use strict";

const models = require('../../models');
const expedienteService = require('./../../servicios/expedientes/expediente');
const Op = models.Sequelize.Op;

module.exports = {
    save,
    deleted,
    getExpedientebyPredio,
    expedienteSearch
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



async function getExpedientebyPredio(req, res, next) {
    try {
        let object = await models.expedientes.findAll({
            where: {
                predio_codigo: req.query.codigo_predio
            }
        });
        // t.commit();
        return res.status(200).send(object);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function expedienteSearch(req, res, next) {
    try {
        if (req.query.opcion == undefined) {
            throw {error: new Error("Argumentos no encontrados de opcion de busqueda"), status: 400, message: "Ha habido un error"};
        }
        if (req.query.idproyecto == undefined) {
            throw {error: new Error("Argumentos no encontrados del ID del Proyecto"), status: 400, message: "Ha habido un error"};
        }
        if (req.query.busqueda == undefined) {
            throw {error: new Error("Argumentos no encontrados de la busqueda"), status: 400, message: "Ha habido un error"};
        }
        
        let listadoExpedientes = await expedienteService.busquedaExpediente(req.query.opcion, req.query.idproyecto, req.query.busqueda);
        return res.status(200).send(listadoExpedientes);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}



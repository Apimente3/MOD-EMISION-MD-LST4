//@ts-check
"use strict";
const models = require('../../models');
const uuidv1 = require('uuid/v1');

const solicitudService = require('./../../servicios/solicitud/solicitud');

module.exports = {
    save,  
    deleted
};

/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        let object = await models.proyectos.findOne({
            where: {
                id: req.body.id
            }
        });
        if (object != null) {
            let obj={...object.dataValues, ...req.body }
            for (const prop in obj) {
                object[prop]=obj[prop]
            }
            object.usuaregistra_id=req.userId;
            await object.save({t});
        } else {
            object = await models.proyectos.create({...req.body,usuaregistra_id:req.userId},{t});
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

        let object = await models.solicituds.findOne({
            where: {
                id: req.body.id
            }
        });
        
        if (!solicitud) {
            throw {
                error: "No se encontro la Peticion de Solicitud Predial.",
                message: "No se encontro la Peticion de Solicitud Predial.",
                status: 400
            }
        }

        object.observacion=req.body.observacion;
        object.usuaregistra_id=req.userId;
        await object.save({t});
        await object.destroy({t});
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

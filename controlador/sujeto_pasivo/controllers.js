//@ts-check
"use strict";

const models = require('../../models');
const predioService = require('./../../servicios/predios/predios');
const Op = models.Sequelize.Op;

module.exports = {
    save_propietario,
    list_propietario
    };




/*Guarda los datos generales de un predio*/
async function save_propietario(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        let object = await models.propietarios.findOne({
            where: {
                predio_id: req.body.predio_id
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
            object = await models.propietarios.create({...req.body,usuaregistra_id:req.userId},{t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}





/*Listado de solictud de los predios*/
async function list_propietario(req, res, next) {
    try {
        let response = await models.propietarios.findOne({
            where: {
                predio_id: req.query.predio_id
            }
        });
        return res.status(200).send(response);
    }
    catch (err) {
        return next(err);
    }
}

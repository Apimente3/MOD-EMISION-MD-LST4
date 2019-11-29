//@ts-check
"use strict";

const models = require('../../models');
const Service = require('./../../servicios/sujeto_pasivo/sujeto_pasivo');
const Op = models.Sequelize.Op;

module.exports = {
    save_propietario,
    list_propietario,
    list_propietario_predio
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

/*Listado de solictud de los predios*/
async function list_propietario_predio(req, res, next) {
    try {
      
        let [response] = await  Service.propietariosbyPredio(req.query.codigo)
        return res.status(200).send(response);
    }
    catch (err) {
        return next(err);
    }
}

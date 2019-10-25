//@ts-check
"use strict";

const models = require('../../models');

module.exports = {
    save
};

/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function save(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
     
        let proceso = await models.proceso_1.findOne({
            where: {
                predio_id: req.body.predio_id
            }
        });
        if (proceso != null) {
            let obj={...proceso.dataValues, ...req.body }
            for (const prop in obj) {
                proceso[prop]=obj[prop]
            }
            await proceso.save({t});
        } else {
            proceso = await models.proceso_1.create(req.body,{t});
        }
        t.commit().then();
        return res.status(200).send(proceso);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}
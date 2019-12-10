
const models = require('../../models');

module.exports = {
    getExpbyProyecto,
    save,
    deleted
};


async function getExpbyProyecto(req, res, next) {
    try {
        let list = await models.expedientes.findAll({
            where: {
                proyecto_codigo:req.query.proyecto_codigo
            }
            , order: [['expediente_codigo','DESC']]
        });
        // t.commit();
        return res.status(200).send(list);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}
/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
    const t = await models.sequelize.transaction();
    try {

        let object = await models.expedientes.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
            }
        });
        if(object != null) {
            let obj={...object.dataValues, ...req.body }
            for (const prop in obj) {
                object[prop]=obj[prop]
            }
            object.usuaregistra_id=req.userId;
            await object.save({t});
        } else {
            object = await models.expedientes.create({...req.body,usuaregistra_id:req.userId},{t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

/*Metodo para eliminar*/
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
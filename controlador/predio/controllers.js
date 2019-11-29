//@ts-check
"use strict";

const models = require('../../models');
const predioService = require('./../../servicios/predios/predios');
const Op = models.Sequelize.Op;

module.exports = {
    
    create,
    update,
    getall,
    getone,
    save,
    deleted,
    listarPredios,
    save_datos_predio,save_ubicacion_predio,
    obtenerPredio,
    obtenerDatosGenerales,obtener_ubicacion_predio,
    getPrediosbyProyecto,
    obtener_sujetopasivo
    

};




/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function create(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        if (!req.body.codigo ) throw {
            error: "Faltan el codigo del Predio",
            message: "Faltan el codigo del Predio",
            status: 400
        };
        req.body.usuaregistra_id=req.userId;
        let response = await models.predios.create(req.body, {t});
        t.commit().then();
        return res.status(200).send(response);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function update(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
        
        console.log('656565666666666666666666666666666666')

        let brigadista = await models.profesional_ddp.findOne({
            where: {
                id: req.params.id
            }
        });
        let obj= req.body
        for (const prop in req.body) {
            brigadista[prop]=obj[prop]
        }
        await brigadista.save({t});
        
        t.commit().then();
        return res.status(200).send(brigadista);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function save(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
        if (!req.body.denominacion || !req.body.codigo || !req.body.expediente || !req.body.concesion_id || !req.body.proyecto_id || !req.body.obra_id || !req.body.profesional_id) throw {
            error: "Faltan algunos campos",
            message: "Ha habido un error",
            status: 400
        };
        let brigadista = await models.profesional_ddp.findOrCreate({
            id: req.body.id
        });
        t.commit().then();
        return res.status(200).send(brigadista[0]);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function getall(req, res, next) {
    try {
        let profesional_ddp = await models.profesional_ddp.findAll({
            where: {
                [Op.or]: [{authorId: 12}, {authorId: 13}]
            }
        });
        // t.commit();
        return res.status(200).send(profesional_ddp);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function getone(req, res, next) {

    try {
        let profesional_ddp = await models.profesional_ddp.findOne({
            where: {id: req.params.id}
        });
        return res.status(200).send(profesional_ddp);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function deleted(req, res, next) {
    try {
        if (!req.body.id) throw {
            error: "Argumentos no encontrados",
            message: "Ha habido un error",
            status: 400
        };
        let brigadista = await models.profesional_ddp.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!profesional_ddp) throw {
            error: new Error("trabajador no encontrado. Id: " + req.params.id),
            message: "trabajador no encontrado",
            status: 404
        };
        await profesional_ddp.destroy();
        return res.status(200).send({
            ok: true
        });
    } catch (err) {
        return next(err);
    }
}

/*Listado de solictud de los predios*/
async function listarPredios(req, res, next) {
    try {
        let solicitud_id = req.query.solicitud_id;
        let response = await predioService.getPrediosbySolicitud(solicitud_id);
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

/*Listado de solictud de los predios*/
async function getPrediosbyProyecto(req, res, next) {
    try {
        let cod_proy = req.query.codigo_proyecto;
        let busq=req.query.busqueda;
        let response = await predioService.getPrediosbyProyecto(cod_proy,busq);
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

/*Listado de solictud de los predios*/
async function obtenerPredio(req, res, next) {
    try {
      
        let response = await models.predios.findOne({
            where: {
                codigo: req.params.codigo
            }
        });
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

/*Listado de solictud de los predios*/
async function obtener_sujetopasivo(req, res, next) {
    try {

        let predio = await models.predios.findOne({
            where: {
                codigo: req.params.codigo_predio
            }
        });
        let sujetopasivo = await models.propietarios.findOne({
            where: {
                predio_id: predio.id
            }
        });
        return res.status(200).send(sujetopasivo);
    } catch (e) {

        return next(e);
    }
}


/*Listado de datos generales del predio*/
async function obtenerDatosGenerales(req, res, next) {
    try {

        let response = await models.datos_predio.findOne({
            where: {
                predio_id: req.params.predio_id
            }
        });
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

/*Listado de datos generales del predio*/
async function obtener_ubicacion_predio(req, res, next) {
    try {

        let response = await models.ubicacion_predio.findOne({
            where: {
                predio_id: req.params.predio_id
            }
        });
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}


async function save(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let object = await models.predios.findOne({
            where: {
                predio_id: req.body.predio_id
            }
        });
        if (object != null) {
            let obj={...object.dataValues, ...req.body }
            for (const prop in obj) {
                object[prop]=obj[prop]
            }
            await object.save({t});
        } else {
            throw {
                error: new Error("No se logro encontrar el Predio con ID: " + req.params.id),
                message: "No se logro encontrar el Predio con ID",
                status: 404
            }; 
        }
        t.commit().then();
        return res.status(200).send(proceso);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


/*Guarda los datos generales de un predio*/
async function save_datos_predio(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let object = await models.datos_predio.findOne({
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
            object = await models.datos_predio.create(req.body,{t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

/*Guarda los datos generales de un predio*/
async function save_ubicacion_predio(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let object = await models.ubicacion_predio.findOne({
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
            object = await models.ubicacion_predio.create(req.body,{t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}





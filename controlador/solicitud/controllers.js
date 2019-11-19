//@ts-check
"use strict";
const models = require('../../models');
const uuidv1 = require('uuid/v1');

const solicitudService = require('./../../servicios/solicitud/solicitud');

module.exports = {
    create,
    uploadFile,
    uploadFileMultiple,
    busqSolicitud,
    busquedaSolictudbyProyecto,
    datosSolicitud,
    updatePolygono,
    deleted,
    drpsolicituds,
    drpsolicitudsbyProy
};


async function deleted(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let solicitud = await models.solicituds.findOne({
            where: {
                denominacion: req.body.denominacion
            }
        });

        if (!solicitud) {
            throw {
                error: "No se encontro la Peticion de Solicitud Predial.",
                message: "No se encontro la Peticion de Solicitud Predial.",
                status: 400
            }
        }

        solicitud.observacion = req.body.observacion;
        solicitud.usuaregistra_id = req.userId;
        await solicitud.save({t});
        await solicitud.destroy({t});
        t.commit().then();
        return res.status(200).send(solicitud);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function create(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
        console.log(req.body);
        req.body.usuaregistra_id = req.userId;
        let solicitudreg = req.body;
        let proyectos_relacionados = req.body.proyectos_relacionados;
        delete solicitudreg.proyectos_relacionados;
        let solicitud = await models.solicituds.create(solicitudreg, {t});

        let proyectos_relacionados_insertado = []
        for (let relacionados of proyectos_relacionados) {
            let proyecto_solicitud = {
                proyecto_id: relacionados.proyecto_id,
                solicitud_id: solicitud.id,
                usuaregistra_id: req.userId
            }
            proyectos_relacionados_insertado.push(await models.proyecto_solicitud.create(proyecto_solicitud, {t}));
        }
        t.commit().then();
        return res.status(200).send(solicitud);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


async function updatePolygono(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let geometria_json = req.body.geometria_json;
        let geometria = req.body.geometria;

        if (!geometria_json || !geometria) {
            throw {
                error: "No se encontro los parametros polygono",
                message: "No se encontro los parametros polygono",
                status: 400
            }
        }

        let solicitud = await models.solicituds.findOne({
            where: {
                id: req.body.id
            }
        });

        if (solicitud != null) {

            solicitud.geometria_json = geometria_json;
            solicitud.geometria = geometria;
            await proceso.save({t});

        } else {
            throw {
                error: "No se encontro el polygono",
                message: "No se encontro el polygono",
                status: 400
            }
        }

        t.commit().then();
        return res.status(200).send(solicitud);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


async function uploadFile(req, res, next) {
    try {

        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        return res.status(200).send({filesave: filenamesaved, originalname: req.originalname});
    } catch (err) {
        return next(err);
    }
}


/*Para cargas los archivos del */

async function uploadFileMultiple(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }


        let solicitud_body = {
            filename: filenamesaved,
            path: req.originalname,
            denominacion: req.body.denominacion,
            usuareg_id: req.userId
        }
        let solicitud_file = await models.solicitud_files.create(solicitud_body, {t});
        t.commit().then();
        return res.status(200).send(solicitud_file);
    } catch (err) {
        return next(err);
    }
}


async function busqSolicitud(req, res, next) {
    try {
        let fecha_inicio = req.query.fecha_inicio;
        let fecha_fin = req.query.fecha_fin;
        let solicitudes = await solicitudService.busquedaSolictud(fecha_inicio, fecha_fin);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

/*Busqueda de solcitud por proyecto*/
async function busquedaSolictudbyProyecto(req, res, next) {
    try {
        let codigo_proyecto = req.query.codigo_proyecto;
        let solicitudes = await solicitudService.busquedaSolictudbyProyecto(codigo_proyecto);
        return res.status(200).send(solicitudes);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function datosSolicitud(req, res, next) {
    try {
        let denominacion = req.query.denominacion;
        let solicitudes = await solicitudService.datosSolicitud(denominacion);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

async function drpsolicituds(req, res, next) {
    try {
        let list = await models.solicituds.findAll({
            attributes: ['id', 'denominacion'],
            order: [
                ['"createdAt"', 'DESC']
            ]
        });
        return res.status(200).send(list);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function drpsolicitudsbyProy(req, res, next) {
    try {
        let list = await solicitudService.drpSolicitudbyProy(req.query.codigo_proyecto);
        return res.status(200).send(list);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}







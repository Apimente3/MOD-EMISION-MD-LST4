//@ts-check
"use strict";

const models = require('../../models');

const equipo_services = require('./../../servicios/equipos/equipos');

module.exports = {
    create,  
    addIntegrante,
    busquedaEquipos,
    detailsEquipo,
};





/**
 * Guardda el modelo
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function create(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
        if (!req.body.denominacion || !req.body.responsable_id    ) throw {
            error: "Faltan algunos campos",
            message: "Ha habido un error",
            status: 400
        };
        req.body.usuareg_id=req.userId;
        let equipo = await models.equipos.create(req.body, {t});
        t.commit().then();
        return res.status(200).send(equipo);
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
async function busquedaEquipos(req, res, next) {
    try {
        if (req.query.busqueda == undefined) {
            throw {error: new Error("Argumentos no encontrados"), status: 400, message: "Ha habido un error"};
        }
        let equipos = await equipo_services.busquedaEquipos(req.query.busqueda);
        return res.status(200).send(equipos);
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
async function detailsEquipo(req, res, next) {
    try {
        if (req.query.equipo_id == undefined) {
            throw {error: new Error("Argumentos no encontrados"), status: 400, message: "Ha habido un error"};
        }
   
        let idproy=req.query.equipo_id;
        let detalleequipo = await equipo_services.detailsEquipo(idproy);
        return res.status(200).send(detalleequipo);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

async function addIntegrante(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        if (!req.body.equipo_id) throw {
            error: "Faltan algunos campos",
            message: "Ha habido un error",
            status: 400
        };
        let integrante=req.body;
        integrante.usuareg_id=req.userId;
        console.log(integrante);
        let response = await models.integrantes.create(integrante, {t});
        t.commit().then();
        return res.status(200).send(response);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


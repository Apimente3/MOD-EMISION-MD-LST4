//@ts-check
"use strict";

const models = require('../../models');

const diagnosticoService = require('./../../servicios/diagnostico/diagnostico');

module.exports = {
    save_consulta_entidades,
    save_inspeccion_campo,
    save_informe_diagnostico,
    listDiagnostico

};


async function save_consulta_entidades(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        let consulta_entidades = req.body;
        consulta_entidades.usuareg_id = req.userId;
        console.log(consulta_entidades);
        let response = await models.consulta_entidades.create(consulta_entidades, {t});
        t.commit().then();
        return res.status(200).send(response);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function save_inspeccion_campo(req, res, next) {

    const t = await models.sequelize.transaction();
    try {
        let visita_campo = req.body;
        visita_campo.usuareg_id = req.userId;
        let response = await models.inspeccion_campo.create(visita_campo, {t});
        t.commit().then();
        return res.status(200).send(response);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function save_informe_diagnostico(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        let informe_diagnostico = req.body;
        informe_diagnostico.usuareg_id = req.userId;
        let response = await models.informe_diagnostico.create(informe_diagnostico, {t});
        t.commit().then();
        return res.status(200).send(response);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


async function listDiagnostico(req, res, next) {
    try {

        let proyecto_id = req.query.proyecto_id;
        let response = await diagnosticoService.list_diagnostico(proyecto_id);
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

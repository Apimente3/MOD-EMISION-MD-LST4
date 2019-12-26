//@ts-check
"use strict";

const models = require('../../models');
const maestroService = require('./../../servicios/maestros/maestros');


module.exports = {
    tipointegrante,
    entidades_consulta,
    tipo_documento,
    tipoproyecto,
    tipoinfraestructura,
    fase
    ,ubigeo,
    tipo_propietario,
    condicion_propietario,
    organo_solicitante
};




async function tipointegrante(req, res, next) {
    try {
        let maestros = await models.tipointegrante.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}


async function entidades_consulta(req, res, next) {
    try {
        let maestros = await models.entidades_consulta.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}

async function tipo_documento(req, res, next) {
    try {
        let maestros = await models.tipo_documento.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}
async function tipoproyecto(req, res, next) {
    try {
        let maestros = await models.tipoproyecto.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}

async function tipoinfraestructura(req, res, next) {
    try {
        let maestros = await models.tipoinfraestructura.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}
async function fase(req, res, next) {
    try {
        let maestros = await models.fase.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}


async function ubigeo(req, res, next) {
    try {

        let response = await maestroService.getUbigeo();
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}


async function tipo_propietario(req, res, next) {
    try {
        let maestros = await models.tipo_propietario.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}

async function condicion_propietario(req, res, next) {
    try {
        let maestros = await models.condicion_propietario.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}


async function organo_solicitante(req, res, next) {
    try {
        let maestros = await models.organo_solicitante.findAll({
        });
        return res.status(200).send(maestros);
    } catch (e) {

        return next(e);
    }
}




//@ts-check
"use strict";

const models = require('../../models');

const auth = require('./../../servicios/login/auth');

const trbajador_ddp = require('./../../servicios/trabajador_ddp');
const Op = models.Sequelize.Op;

const bcrypt = require('../../infra/crypto/bcrypt')
module.exports = {
    create,
    update,
    getall,
    getone,
    save,
    deleted,
    busquedaTrabajadores,
    getResponsables,
    getBrigadistas

};

async function loginTrabajador(req, res, next) {

    try {
        if (!req.body.dni || req.body.dni.trim()===''){
            throw { error: new Error("Argumentos no encontrados"), status: 400, message: "Ha habido un error" };
        }

        console.log('paso if')
        let user = await auth.login(req.body.dni,req.body.clave);
        // t.commit();
        return res.status(200).send(user);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function busquedaTrabajadores(req, res, next) {
    /*Creamos la transaccion*/
    // const t = await models.sequelize.transaction();
    try {
        /* console.log(req.params)
         console.log(req.query)
         console.log(req.query.dni )*/
        console.log('**************busqueda**********')

        if (req.query.dni == undefined) {
            throw {error: new Error("Argumentos no encontrados"), status: 400, message: "Ha habido un error"};
        }
        let trabajdores = await trbajador_ddp.getTrabajadoresDDP(req.query.dni);
        console.log(trabajdores)
        return res.status(200).send(trabajdores);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

/**
 * Obtiene los reposables de los proyectos
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function getResponsables(req, res, next) {
    /*Creamos la transaccion*/
    // const t = await models.sequelize.transaction();
    try {
     
        let data = await trbajador_ddp.getResposables();
       // console.log({responsables,equipos})
        return res.status(200).send(data);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

/**
 * Obtiene los reposables de los proyectos
 * @body {} id Id del despacho
 * @return {Promise<object>} modelo
 */
async function getBrigadistas(req, res, next) {
    /*Creamos la transaccion*/
    // const t = await models.sequelize.transaction();
    try {

        let brigadista = await trbajador_ddp.getBrigadistas();
      
        return res.status(200).send(brigadista);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function getBrigadistasbyBrigada(req, res, next) {
    /*Creamos la transaccion*/
    // const t = await models.sequelize.transaction();
    try {

        let brigadista = await trbajador_ddp.getBrigadistas(req.query.brigada_id);

        return res.status(200).send(brigadista);
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
async function create(req, res, next) {

    const t = await models.sequelize.transaction();
    try {

        if (!req.body.foto || !req.body.dni || !req.body.nombres || !req.body.apellidos || !req.body.direccion || !req.body.correo || !req.body.telefonos
            || !req.body.fech_vigencia || !req.body.cargo || !req.body.rol || !req.body.contrasenia
        ) throw {
            error: "Faltan algunos campos",
            message: "Ha habido un error",
            status: 400
        };
        req.body.contrasenia=await bcrypt.encrypt(req.body.contrasenia);
            let brigadista = await models.profesional_ddp.create(req.body, {t});
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
        
        brigadista.contrasenia= await bcrypt.encrypt(req.body.contrasenia);
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
        profesional_ddp.contrasenia='************';
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
//@ts-check
"use strict";
const auth = require('./../../servicios/login/auth');

const models = require('../../models');
const moment =require('moment');
module.exports = {
    login,
    quienSoy
};

/**/
async function login(req, res, next) {

    try {
        if (!req.body.dni || req.body.dni.trim()===''){
            throw { error: new Error("Nose se encontro envio del DNI"), status: 400, message: "Nose se encontro envio del DNI" };
        }
        let user = await auth.login(req.body.dni,req.body.password);
        req.session.user = user;
        // t.commit();
        return res.status(200).send(user);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

async function quienSoy(req, res, next) {
    
    const token=req.body.token;
    try {
        if (!token){
            throw { error: new Error("Nose se encontro el Token"), status: 400, message: "Nose se encontro el Token" };
        }
        let id= await auth.whoSoy(token);
        let trabajador = await models.profesional_ddp.findOne({
            where: {
                id: id
            }
        });
        //trabajador.foto=null;
        trabajador.contrasenia=null;
        return res.status(200).send(trabajador);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

//@ts-check
"use strict";
const models = require('../../models');
const uuidv1 = require('uuid/v1');

const Service = require('./../../servicios/proyectos/solicitud');
const predioService = require('./../../servicios/predios/predios');
const equipo_services = require('./../../servicios/equipos/equipos');

module.exports = {
    save,  
    deleted,
    listarProyectos,
    resumenProyectos,
    resumenProyectosbyCodigo,
    drpProyectos,
    getProyecto,
    solicitudesVinculadas,
    ambitogeografico,
    getDataConfiguracionbyProy,
    getDataFilesPortadabyProy
};

/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
    const t = await models.sequelize.transaction();
    try {
        
        let object = await models.proyectos.findOne({
            where: {
                id: req.body.id ? req.body.id : 0 
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
            object = await models.proyectos.create({...req.body,usuaregistra_id:req.userId},{t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


async function deleted(req, res, next) {
    const t = await models.sequelize.transaction();
    try {

        let object = await models.solicituds.findOne({
            where: {
                id: req.body.id
            }
        });
        
        if (!solicitud) {
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


async function listarProyectos(req, res, next) {
    try {
             let solicitudes = await Service.listarProyectos(req.query.busqueda);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function resumenProyectos(req, res, next) {
    try {
        let solicitudes = await Service.resumenProyectos();
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function resumenProyectosbyCodigo(req, res, next) {
    try {
        let solicitudes = await Service.resumenProyectosbyCodigo(req.query.codigo);
        
       // let detalleequipo = await equipo_services.detailsEquipo(solicitudes[0].id);
       let predios = await predioService.getPrediosbyProyecto(req.query.codigo,'');

       for (var i = 0; i < predios.length; i++) {
            let propiedadAnt=null
            propiedadAnt={...(predios[i].polygonojson.features[0].properties),...predios[i]}
            console.log(propiedadAnt)
           
            // predios[i].polygonojson.features[0].properties=propiedadAnt
        }
        
        solicitudes[0].predios=predios;
      //  solicitudes[0].brigadaresposable=detalleequipo;
        
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

async function solicitudesVinculadas(req, res, next) {
    try {
        let solicitudes = await Service.solicitudesVinculadas(req.query.codigo);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function drpProyectos(req, res, next) {
    try {
        let list = await models.proyectos.findAll({
            attributes: ['id', 'codigo','descripcion','tipo_infraestructura_id'],
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

async function getProyecto(req, res, next) {
    try {
        let object = await models.proyectos.findOne({
            where : {
                codigo:req.params.codigo_proyecto
            }
        });
        console.log(object)
        return res.status(200).send(object);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

//Obtiene el ambito de trabajo del proyecto  respoecto a la as capas de departamento , provincias y distritos
async function ambitogeografico(req, res, next) {
    try {
        let solicitudes = await Service.ambitogeografico(req.query.codigo);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

//mustrar los datos para la configuracion de un predio
async function getDataConfiguracionbyProy(req, res, next) {
    try {
        let object  = await Service.getDataConfiguracionbyProy(req.query.codigo);
        return res.status(200).send(object);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

//Obtiene los datos de los archivo e imaggenes de un predio
async function getDataFilesPortadabyProy(req, res, next) {
    try {
        let solicitudes = await Service.getDataFilesPortadabyProy(req.query.codigo);
        return res.status(200).send(solicitudes);
        // return res.status(200).send({});
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}

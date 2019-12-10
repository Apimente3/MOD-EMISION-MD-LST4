
const models = require('../../models');
const Service = require('./../../servicios/visor_geografico/index');

module.exports = {
    mapa_tematico,kpi_visor,avance_detallado
};

/*Listado de solictud de los predios*/
async function mapa_tematico(req, res, next) {
    try {
        let solicitud_id = req.query.solicitud_id;
        let response = await Service.mapa_tematico(req.query.anio);
        console.log(response)
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}

/*Listado de solictud de los predios*/
async function kpi_visor(req, res, next) {
    try {
        let solicitud_id = req.query.solicitud_id;
        let response = await Service.kpisvisor(req.query.anio);
        console.log(response)
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}


async function avance_detallado(req, res, next) {
    try {
        let solicitud_id = req.query.solicitud_id;
        let response = await Service.avance_detallado();
        console.log(response)
        return res.status(200).send(response);
    } catch (e) {

        return next(e);
    }
}
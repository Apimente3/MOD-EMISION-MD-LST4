const models = require('../../models');
const sequelize = models.sequelize;
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');
const tokenInfra = require('./../../infra/jwt/jwt');

const turf = require('turf')


module.exports = {

    busquedaSolictud,datosSolicitud
};


async function busquedaSolictud(fecha_inicio, fecha_fin) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";
        if (!fecha_fin || !fecha_inicio) {
            sql = `
            select c.denominacion tipoinfraestructura ,b.denominacion tipoproyecto ,to_char(a."createdAt",'dd/mm/yyyy HH24:mi') fecha_registro,a.* from pred.solicituds a
            inner join pred.tipoproyecto b on a.tipoproy_id=b.id
            inner join pred.tipoinfraestructura c on a.tipoinfra_id=c.id
            order by a."createdAt" desc
            limit 15
     `;
        } else {
            sql = `
                 
            select c.denominacion tipoinfraestructura ,b.denominacion tipoproyecto ,to_char(a."createdAt",'dd/mm/yyyy HH24:mi') fecha_registro,a.* from pred.solicituds a
            inner join pred.tipoproyecto b on a.tipoproy_id=b.id
            inner join pred.tipoinfraestructura c on a.tipoinfra_id=c.id
            where "createdAt">='${fecha_inicio} 00:00' and "createdAt"<='${fecha_fin}  23:00'
             order by a."createdAt" desc
`
        }

        const solicitudes = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!solicitudes) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        return solicitudes;
    }
    catch (err) {
        throw err;
    }
}




async function datosSolicitud(denominacion) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";
  
            sql = `
          select c.denominacion tipoinfraestructura ,b.denominacion tipoproyecto ,to_char(a."createdAt",'dd/mm/yyyy HH24:mi') fecha_registro
,d.nombres ||' '|| d.apellidos responsable
, e.denominacion brigada
,a.* from pred.solicituds a
            inner join pred.tipoproyecto b on a.tipoproy_id=b.id
            inner join pred.tipoinfraestructura c on a.tipoinfra_id=c.id
			   inner join pred.profesional_ddp d on a.responsable_id=d.id
		   inner join pred.equipos e on a.brigada_id=e.id
          
		  where ltrim(rtrim(a.denominacion))= ltrim(rtrim('${denominacion}'))

     `;
 
       

        const solicitud = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!solicitud) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        return solicitud;
    }
    catch (err) {
        throw err;
    }
}







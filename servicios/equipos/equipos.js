const models = require('../../models');
const sequelize = models.sequelize;
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');
const tokenInfra = require('./../../infra/jwt/jwt');

const turf = require('turf')


module.exports = {
    busquedaEquipos,
    detailsEquipo
};


async function busquedaEquipos(busqueda) {
    try {

        //  console.log('servicio',placa, password)
        let sql = `
            
            
            SELECT a.id,a.denominacion,to_char(a."createdAt",'dd/mm/yyyy HH24:mi') fecha_registro,case when b.cantIntegrantes is null then 0 else  b.cantIntegrantes end cantintegrantes
            , c.nombres||' '||c.apellidos responsable  FROM pred.equipos a 
            left join (select equipo_id, sum(id) cantIntegrantes from pred.integrantes group by equipo_id ) b on a.id=b.equipo_id
            left join pred.profesional_ddp c on a.responsable_id=c.id
            where a.denominacion ilike '%${busqueda}%'
            order by a."createdAt" desc
            limit 30
			
     `;
        console.log(sql)
        const equipos = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!equipos) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        return equipos;
    }
    catch (err) {
        throw err;
    }
}


async function detailsEquipo(id) {
    try {
        
        let result={}

         console.log('servicio',id);
        let sql='';
        sql = `
        select a.id,a.denominacion,a.responsable_id from pred.equipos a
        where id=${id}
        `;
      
        const [equipo] = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        if (!equipo) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        result.equipo=equipo;
        console.log(equipo)

        sql = `
        select a.id,b.denominacion rol,a.nombres||' '||a.apellidos nombres, a.correo, a.telefonos, a.cargo, a.foto  from pred.profesional_ddp a
        inner join pred.rol_ddp b on a.rol=b.id
        where a.id=${equipo.responsable_id}
        `;


        const [resposable] = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        if (!resposable) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        result.resposable=resposable;

        sql = `
    select c.denominacion tipo_integrante, b.rol,b.nombres,b.correo,b.telefonos,b.cargo,b.foto,a.* from pred.integrantes a
inner join (select a.id,a.foto,b.denominacion rol,a.nombres||' '||a.apellidos nombres, a.correo, a.telefonos, a.cargo  from pred.profesional_ddp a
inner join pred.rol_ddp b on a.rol=b.id) b on a.integrante_id=b.id
inner join pred.tipointegrante c on a.tipointegrante_id=c.id
where equipo_id=${id}
        `;

        const integrantes = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        if (!integrantes) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        result.integrantes=integrantes;
        
        
        return result;
    }
    catch (err) {
        throw err;
    }
}















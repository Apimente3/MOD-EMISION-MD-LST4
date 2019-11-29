const models = require('../../models');
module.exports = {
    listarProyectos,
    resumenProyectos,
    resumenProyectosbyCodigo,
    solicitudesVinculadas
};


async function listarProyectos(busqueda) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         select a.id idproyecto, b.denominacion tipo_infraestructura,a.codigo,a.descripcion,a.pmd, b.icono, b.image,a.portada_imagen
           ,to_char(a."createdAt",'yyyy/mm/dd hh24:mi') fecha_creacion
          from  pred.proyectos  a
 inner join pred.tipoinfraestructura b on b.id=a.tipo_infraestructura_id
 where upper(a.codigo) ||' '||upper(a.descripcion) ||' '|| b.denominacion  ilike '%${busqueda.toUpperCase()}%'
 order by a."createdAt" desc
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("No existen Proyectos Registrados"),
                message: "No existen Proyectos Registrados",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}

async function resumenProyectos() {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         select  b.denominacion,b.image,b.icono, count(a.*) from  pred.proyectos  a
 right join pred.tipoinfraestructura b on b.id=a.tipo_infraestructura_id
 GROUP BY b.denominacion,b.image,b.icono
 order by b.denominacion desc

     `;
     
        const list = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("No existen Proyectos Registrados"),
                message: "No existen Proyectos Registrados",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


async function resumenProyectosbyCodigo(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
       SELECT a.id, c.dni,c.nombres,c.apellidos,c.direccion,c.correo,c.telefonos,c.cargo
,b.denominacion tipo_infraestructura,b.icono
,a.tipo_infraestructura_id, a.codigo, a.descripcion, a.concesion, a.fech_inicio, a.fech_fin, a.pmd, a.imagenes, a.polygonojson
,to_char(a."createdAt",'yyyy/mm/dd HH24:mi') fecha_registro , portada_imagen
FROM pred.proyectos a 
	inner join pred.tipoinfraestructura b on a.tipo_infraestructura_id=b.id
	inner join pred.profesional_ddp c on a.usuaregistra_id=c.id
	where a.codigo='${codigo}'

     `;

        const list = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("No existen Proyectos Registrados"),
                message: "No existen Proyectos Registrados",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


async function solicitudesVinculadas(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
   select c.* from pred.proyectos a
inner join pred.proyecto_solicitud b on a.id=b.proyecto_id
inner join pred.solicituds c on c.id=b.solicitud_id
where  a.codigo='${codigo}'

     `;

        const list = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("No existen Proyectos Registrados"),
                message: "No existen Proyectos Registrados",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}











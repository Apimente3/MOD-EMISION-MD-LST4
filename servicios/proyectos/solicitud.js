const models = require('../../models');
module.exports = {
    listarProyectos,
    resumenProyectos,
    resumenProyectosbyCodigo,
    solicitudesVinculadas,
    ambitogeografico,
    getDataConfiguracionbyProy,
    getDataFilesPortadabyProy
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


async function ambitogeografico(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `


WITH proyectos AS (
        select * from pred.proyectos where codigo='${codigo}'
     ), distritos AS (
       select b.id, nombdep,nombprov,nombdist from pred.distritos a
inner join proyectos b on ST_Intersects(b.polygono,a.geom )
)
select 
array_agg(distinct a.nombdep) departamentos,array_agg(distinct a.nombprov) provincias
,array_agg(distinct a.nombdist) distritos
from distritos  a
left join distritos b on a.id=b.id


     `;

        const list = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("No se logro encontrar el ambito del proyecto"),
                message: "No se logro encontrar el ambito del proyecto",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}

//Muestra los datos de la configuracion de un predio
async function getDataConfiguracionbyProy(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
        
        select a.id ,a.codigo,a.descripcion,to_char(a."createdAt", 'YYYY/mm/dd HH24:MI') fecha_registro  
,b.nombres||' '||b.apellidos usuaregistra
from pred.proyectos a 
inner join pred.profesional_ddp b on a.usuaregistra_id=b.id
where 
a.codigo='${codigo}'



     `;

        const [list] = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("Ocurrio un error al obtener los datos del Proyecto"),
                message: "Ocurrio un error al obtener los datos del Proyecto",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


// Obtiene las imagenes y los archivos del Proyecto
async function getDataFilesPortadabyProy(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
        select id,portada_imagen,portada_imagen2,portada_imagen3,archivos
        from pred.proyectos a 
        where 
        a.codigo='${codigo}'
        `;
        console.log(sql);

        const [list]= await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!list) {
            throw {
                error: new Error("Ocurrio un error al obtener los datos del Proyecto"),
                message: "Ocurrio un error al obtener los datos del Proyecto",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}



async function resumenProyectosbyCodigo2(codigo) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
	
        SELECT b.denominacion tipo_infraestructura,a.descripcion deno_proyecto,a.pmd,
        to_char(a."createdAt",'yyyy/mm/dd') fecha_registro,c.nombres||' '||c.apellidos usua_registra,portada_imagen,portada_imagen2
        ,portada_imagen3
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











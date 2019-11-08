const models = require('../../models');
module.exports = {
    listarProyectos,
    resumenProyectos
};


async function listarProyectos(busqueda) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         select a.id, b.denominacion tipo_infraestructura,a.codigo,a.descripcion,a.pmd, b.icono, b.image from  pred.proyectos  a
 inner join pred.tipoinfraestructura b on b.id=a.tipo_infraestructura_id
 where upper(a.codigo) ||' '||upper(a.descripcion) ilike '%${busqueda.toUpperCase()}%'

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








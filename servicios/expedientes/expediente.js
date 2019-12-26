const models = require('../../models');


module.exports = {
    busquedaExpediente,

};


async function busquedaExpediente(opcion, idproyecto, busqueda) {
    try {

        let sql = '';
        switch (opcion.trim()) {
            case '1':
                sql = `
                SELECT * FROM pred.expedientes
                WHERE  
                expediente_codigo ilike '%${busqueda}%' and proyecto_id=${idproyecto}
                 `;
                break;
            case '2':
                sql = `
                SELECT * FROM pred.expedientes
                WHERE  
               	expediente_titulares ilike '%${busqueda}%' and proyecto_id=${idproyecto}
                 `;
                break;
            case '3':
                sql = `
                SELECT * FROM pred.expedientes
                WHERE  
                	dni_ruc ilike '%${busqueda}%' and proyecto_id=${idproyecto}
                 `;
                break;

        }

        console.log(sql)
        const listexpedientes = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!listexpedientes) {
            throw {
                error: new Error("No existen resultados para esta busqueda "),
                message: "No existen resultados para esta busqueda",
                status: 401
            };
        }
        
        return listexpedientes;
    }
    catch (err) {
        throw err;
    }
}

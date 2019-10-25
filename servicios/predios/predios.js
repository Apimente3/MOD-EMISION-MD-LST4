const models = require('../../models');
const sequelize = models.sequelize;



module.exports = {

    getPrediosbySolicitud
};



async function getPrediosbySolicitud(solicitud_id) {
    try {

        //  console.log('servicio',placa, password)
        let sql = `
        
        select b.nombres||' '||b.apellidos usuaregistra,to_char(a."createdAt",'dd/mm/yyyy hh24:mi') fech_registro,a.* from pred.predios a 
        inner join pred.profesional_ddp b on b.id=a.usuaregistra_id
        where solicitud_id=${solicitud_id}
        order by a."createdAt" desc

     `;
        console.log(sql)
        const trabajadores = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        if (!trabajadores) {
            throw {
                error: new Error("no existen clientes asignado para este dia : " ),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        return trabajadores;
    }
    catch (err) {
        throw err;
    }
}

















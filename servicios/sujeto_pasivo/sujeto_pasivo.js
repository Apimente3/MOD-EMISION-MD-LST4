const models = require('../../models');
module.exports = {
   propietariosbyPredio
};


async function propietariosbyPredio(codigo_predio) {
    try {

        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
        select d.denominacion condicion_propietario
,c.denominacion tipo_propietario ,b.codigo codigo_predio,a.* from pred.propietarios a
inner join pred.predios b on b.id=a.predio_id
inner join pred.tipo_propietario c on c.id=a.tipo_propietario_id
inner join pred.condicion_propietario d on d.id=a.condicion_propietario_id
where b.codigo='${codigo_predio}'
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

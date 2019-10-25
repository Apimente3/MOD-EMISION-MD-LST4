const models = require('../../models');


module.exports = {
    getUbigeo
};




async function getUbigeo() {
    try {

        let response={};
        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
  select distinct departamento id, departamento from pred.ubigeo
order by departamento

     `;

        response.departamentos = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
select distinct provincia id, provincia,departamento from pred.ubigeo
order by departamento,provincia

     `;

        response.provincias = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
select distinct ubigeo id, distrito, provincia,departamento from pred.ubigeo
order by departamento,provincia,distrito

     `;

        response.distritos = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        
        
        if (!response) {
            throw {
                error: new Error("no existen clientes asignado para este dia : "),
                message: "Trabajadores no asignados",
                status: 401
            };
        }
        return response;
    }
    catch (err) {
        throw err;
    }
}







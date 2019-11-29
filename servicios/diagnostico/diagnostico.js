const models = require('../../models');


module.exports = {
    list_diagnostico
};




async function list_diagnostico(proyecto_id) {
    try {

        let response={};
        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         
            
            SELECT *
            FROM (
            SELECT a.id idconsulta, b.denominacion ||' '||a.entidad_consulta institucion
            ,a.fecha_envio_oficio,a.fecha_respuesta_oficio ,a.doc_envio,a.doc_respuesta,a.files files_consulta, a.entidad_consulta
            ,to_char(a."createdAt",'dd/mm/yyyy hh24:mi') fech_reg_consulta
            ,c.nombres||' '||c.apellidos usuareg_consulta FROM pred.consulta_entidades a
            inner join pred.entidades_consulta b on a.entidad_consulta_id=b.id
            inner join pred.profesional_ddp c on c.id=a.usuareg_id
            where proyecto_id=${proyecto_id}
            ) t1 FULL OUTER JOIN 
            (
            SELECT a.id idvisita,  objetivo, actividades, fecha_inicio , fecha_fin  
            , apoyo_equipo_tec, informe_inspeccion, files files_visita
            ,to_char(a."createdAt",'dd/mm/yyyy hh24:mi') fech_reg_visita
            ,c.nombres||' '||c.apellidos usuareg_visita
            FROM pred.inspeccion_campo a
            inner join pred.profesional_ddp c on c.id=a.usuareg_id
            where proyecto_id=${proyecto_id}	
            ) t2 ON (1 = 0)
            
            ORDER BY fecha_envio_oficio,fecha_inicio desc

     `;
        

         response.actividades = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
       select a.*,b.nombres||' '||b.apellidos usua_reg from pred.informe_diagnostico a 
 inner join pred.profesional_ddp b on a.usuareg_id=b.id
        where a.proyecto_id=${proyecto_id}
     `;

        response.informe_final = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        
        
        if (!response) {
            throw {
                error: new Error("Error : "),
                message: "Error",
                status: 401
            };
        }
        return response;
    }
    catch (err) {
        throw err;
    }
}







const models = require('../../models');


module.exports = {
    mapa_tematico,
    kpisvisor,avance_detallado
};


async function mapa_tematico(anio) {
    try {

        let response = null;
        //  console.log('servicio',placa, password)
        let sql = "";
        
        if(!anio || anio=='' ){

            sql = `
         
        SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
        ) geojson
        FROM (
        SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs) - 'gid' - 'geom'
        ) AS feature
        FROM (
        
         select a.id,expediente_codigo EXPEDIENTE,expediente_titulares TITULARES ,clasificacion CLASIFICACION,
        COALESCE(inform_pred_area_adquirida_m,'0') AREA_ADQUIRIDA, COALESCE(a.estado,'EN PROCESO')  TIPO_PROCEDIMIENTO
        , COALESCE(monto_pagar,'0') MONTO_PAGAR,COALESCE(gestion_rm_numero_resolucion,'-') NRO_RESOLUCION
        ,COALESCE(to_char(gestion_rm_fecha_publicacion,'dd/mm/yyyy'),'-') FECHA_PUBLICACION_RM,b.geom
        , COALESCE(c.color,'#C0C0C0') color, inform_pred_area_adquirida_m area_adquirida,
		 monto_pagar::numeric/COALESCE(inform_pred_area_adquirida_m,'1')::numeric valor_metro
        from pred.expedientes a
        inner join pred.proypredio_cajamarca b on a.expediente_codigo=b.text
        left join pred.tipo_expediente c on a.estado=c.denominacion
		
        
        ) inputs) features;

     `;
            
        }else{
            sql = `
         
        SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
        ) geojson
        FROM (
        SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs) - 'gid' - 'geom'
        ) AS feature
        FROM (
        
         select a.id,expediente_codigo EXPEDIENTE,expediente_titulares TITULARES ,clasificacion CLASIFICACION,
        COALESCE(inform_pred_area_adquirida_m,'0') AREA_ADQUIRIDA, COALESCE(a.estado,'EN PROCESO')  TIPO_PROCEDIMIENTO
        , COALESCE(monto_pagar,'0') MONTO_PAGAR,COALESCE(gestion_rm_numero_resolucion,'-') NRO_RESOLUCION
        ,COALESCE(to_char(gestion_rm_fecha_publicacion,'dd/mm/yyyy'),'-') FECHA_PUBLICACION_RM,b.geom
        , COALESCE(c.color,'#C0C0C0') color, inform_pred_area_adquirida_m area_adquirida,
		 monto_pagar::numeric/COALESCE(inform_pred_area_adquirida_m,'1')::numeric valor_metro
        from pred.expedientes a
        inner join pred.proypredio_cajamarca b on a.expediente_codigo=b.text
        left join pred.tipo_expediente c on a.estado=c.denominacion
		--where date_part('year',gestion_rm_fecha_expedicion)=${anio}
        
        ) inputs) features;

     `;
        }

      


        response = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

    
        if (!response) {
            throw {
                error: new Error("Error : "),
                message: "Error",
                status: 401
            };
        }
        return response[0].geojson;
    }
    catch (err) {
        throw err;
    }
}



async function kpisvisor(anio) {
    try {

        let response = {};
        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         
     SELECT te.denominacion as estado, COALESCE(e.total,0) as total FROM pred.tipo_expediente te LEFT JOIN
(SELECT COUNT(estado) as total, estado FROM pred.expedientes WHERE estado IS NOT NULL
${anio ? `and date_part('year',gestion_rm_fecha_expedicion)=${anio}`:''}
GROUP BY estado) e ON te.denominacion = e.estado order by te.orden

     `;


        response.estados = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        sql = `
         
     SELECT te.denominacion as estado, ROUND(COALESCE(e.total,0),2) as total FROM pred.tipo_expediente te LEFT JOIN
(SELECT estado, SUM(inform_pred_area_adquirida_m) as total FROM pred.expedientes
WHERE estado IS NOT NULL
${anio ? `  and date_part('year',gestion_rm_fecha_expedicion)=${anio}`:''}
    GROUP BY estado) e ON te.denominacion = e.estado  order by te.orden
    
`;

        response.area_adquirida = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
         
     SELECT te.denominacion as estado, ROUND(COALESCE(e.total,0),0) as total FROM pred.tipo_expediente te LEFT JOIN
(SELECT estado, SUM(monto_pagar::numeric/1000000) as total FROM pred.expedientes
WHERE estado IS NOT NULL
${anio ? `and date_part('year',gestion_rm_fecha_expedicion)=${anio}`:''}
    GROUP BY estado) e ON te.denominacion = e.estado order by te.orden
    
`;

        response.monto_pagar = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

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






async function avance_detallado() {
    try {

        let response = {};
        //  console.log('servicio',placa, password)
        let sql = "";

        sql = `
         

	select m.ANIO||'-'||M.MES PERIODO,'TRATO DIRECTO' TIPOEXPDIENTE,COALESCE(t.SUM,0) CANTIDAD from (
			select estado,periodo, sum(total) from (

				SELECT te.denominacion as estado,periodo, COALESCE(e.total,0) as total 
				FROM pred.tipo_expediente te INNER JOIN 
				(
					SELECT COUNT(estado) as total
					, date_part('year',gestion_rm_fecha_expedicion::timestamp) 
					||'-'|| date_part('month',gestion_rm_fecha_expedicion::timestamp) periodo
					,estado	FROM pred.expedientes WHERE 
					estado IS NOT NULL AND gestion_rm_fecha_expedicion IS NOT NULL AND estado='TRATO DIRECTO'
					GROUP BY estado,periodo,gestion_rm_fecha_expedicion
					order by gestion_rm_fecha_expedicion asc

				) e ON te.denominacion = e.estado
				order by estado,periodo

			) tabl 

			group by estado,periodo
	
	) t FULL join pred.meses m on m.anio||'-'||m.mes = t.periodo 
	ORDER BY M.ANIO,M.MES

     `;


        response.trato_directo = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});
        sql = `
         
  
select m.ANIO||'-'||M.MES PERIODO,'EXPROPIACION' TIPOEXPDIENTE,COALESCE(t.SUM,0) CANTIDAD from (
			select estado,periodo, sum(total) from (

				SELECT te.denominacion as estado,periodo, COALESCE(e.total,0) as total 
				FROM pred.tipo_expediente te INNER JOIN 
				(
					SELECT COUNT(estado) as total
					, date_part('year',gestion_rm_fecha_expedicion::timestamp) 
					||'-'|| date_part('month',gestion_rm_fecha_expedicion::timestamp) periodo
					,estado	FROM pred.expedientes WHERE 
					estado IS NOT NULL AND gestion_rm_fecha_expedicion IS NOT NULL AND estado='EXPROPIACION'
					GROUP BY estado,periodo,gestion_rm_fecha_expedicion
					order by gestion_rm_fecha_expedicion asc

				) e ON te.denominacion = e.estado
				order by estado,periodo

			) tabl 

			group by estado,periodo
	
	) t FULL join pred.meses m on m.anio||'-'||m.mes = t.periodo 
	ORDER BY M.ANIO,M.MES
     `;

        response.expropiacion = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
         

select m.ANIO||'-'||M.MES PERIODO,'PAGO DE MEJORAS' TIPOEXPDIENTE,COALESCE(t.SUM,0) CANTIDAD from (
			select estado,periodo, sum(total) from (

				SELECT te.denominacion as estado,periodo, COALESCE(e.total,0) as total 
				FROM pred.tipo_expediente te INNER JOIN 
				(
					SELECT COUNT(estado) as total
					, date_part('year',gestion_rm_fecha_expedicion::timestamp) 
					||'-'|| date_part('month',gestion_rm_fecha_expedicion::timestamp) periodo
					,estado	FROM pred.expedientes WHERE 
					estado IS NOT NULL AND gestion_rm_fecha_expedicion IS NOT NULL AND estado='PAGO DE MEJORAS'
					GROUP BY estado,periodo,gestion_rm_fecha_expedicion
					order by gestion_rm_fecha_expedicion asc

				) e ON te.denominacion = e.estado
				order by estado,periodo

			) tabl 

			group by estado,periodo
	
	) t FULL join pred.meses m on m.anio||'-'||m.mes = t.periodo 
	ORDER BY M.ANIO,M.MES

     `;

        response.pago_mejoras = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        sql = `
         

	select m.ANIO||'-'||M.MES PERIODO,'INTERFERENCIAS' TIPOEXPDIENTE,COALESCE(t.SUM,0) CANTIDAD from (
			select estado,periodo, sum(total) from (

				SELECT te.denominacion as estado,periodo, COALESCE(e.total,0) as total 
				FROM pred.tipo_expediente te LEFT JOIN 
				(
					SELECT COUNT(estado) as total
					, date_part('year',gestion_rm_fecha_expedicion::timestamp) 
					||'-'|| date_part('month',gestion_rm_fecha_expedicion::timestamp) periodo
					,estado	FROM pred.expedientes WHERE 
					estado IS NOT NULL AND gestion_rm_fecha_expedicion IS NOT NULL --AND estado='TRATO DIRECTO'
					GROUP BY estado,periodo,gestion_rm_fecha_expedicion
					order by gestion_rm_fecha_expedicion asc

				) e ON te.denominacion = e.estado
				order by estado,periodo

			) tabl 
WHERE tabl.ESTADO='INTERFERENCIAS'
			group by estado,periodo
	
	) t FULL join pred.meses m on m.anio||'-'||m.mes = t.periodo 

	ORDER BY M.ANIO,M.MES

     `;

        response.interferencias = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

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



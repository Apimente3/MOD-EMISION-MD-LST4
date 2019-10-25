const models = require('../../models');
const sequelize = models.sequelize;
const Op = models.Sequelize.Op;
const bcrypt = require('bcrypt');
const tokenInfra = require('./../../infra/jwt/jwt');

const turf = require('turf')


module.exports = {

    getlistadoClientebyPlaca,
    validarMarcadoLLegada,
    getlistadoClientePendiente,
    finalizarCliente,
    distancia
};

/*Implementado la funcion del login de un transportista*/
async function getlistadoClientebyPlaca(placa, orden = 'desc') {
    try {

        //  console.log('servicio',placa, password)
        let sql = `
        set timezone='America/Lima';
            select b.codigo_cliente,b.nombre_comercial,b.razon_social,b.division,b.telefono,b.zona_ventas
, c.direccion_nro,c.latitud,c.longitud,c.direccion ,
       a.*,

 CASE
  WHEN a.estado_planilla=0 THEN 'Pendiente'
  WHEN a.estado_planilla=1 THEN 'Entregado'
  WHEN a.estado_planilla=2 THEN 'Parcial'
  WHEN a.estado_planilla=3 THEN 'Rechazado'
  WHEN a.estado_planilla=4 THEN 'Cerrado'
  ELSE 'No entregado'
 END AS estado_transaccion
 
 ,

 CASE
  WHEN a.prioridad=0 THEN 'red'
  WHEN a.prioridad=1 THEN '#2196F3'

  ELSE '#FFFFFF'
 END AS color_prioridad
 
 
  ,

 CASE
  WHEN a.estado_planilla=0 THEN 'red'
  WHEN a.estado_planilla=1 THEN '#00A3E7'
  WHEN a.estado_planilla=2 THEN '#EB7D16'
  WHEN a.estado_planilla=3 THEN '#0F0F11'
  WHEN a.estado_planilla=4 THEN '#D8D9DB'
  ELSE 'No entregado'
 END AS color_estado


from transacciones a
inner join clientes b on a.codigo_cliente=b.codigo_cliente
inner join clientes_direccion c on c.codigo_cliente=a.codigo_cliente and c.direccion_nro=a.direccion_nro
WHERE a.placa='${placa}'  and (a.finalizado=false or a.finalizado is null)
  and fecha_entrega=date(now())
  order by a.prioridad ${orden}
     `;
        console.log(sql)

        const clientes = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        console.log(clientes)

        if (!clientes) {
            throw {
                error: new Error("no existen clientes asignado para este dia : " + sequelize.fn('NOW')),
                message: "Clientes no asignados",
                status: 401
            };
        }

        return clientes;
    }
    catch (err) {
        throw err;
    }
}


/*Implementado la funcion del login de un transportista*/
async function validarMarcadoLLegada(id) {
    try {
        let ismarcado = false;
        let transaccion = await models.transacciones.scope(null).findOne({
            where: {
                id: id,
            }
        });
        if (!transaccion) {
            throw {
                error: new Error("no existen resultados : " + sequelize.fn('NOW')),
                message: "Clientes no asignados",
                status: 401
            };
        }
        if (transaccion.hora_llegada == 'null' || transaccion.hora_llegada == null) {
            console.log('entro sin marcado')
            ismarcado = false;
        } else {
            console.log('entro con marcado')
            ismarcado = true;
        }
        return {ismarcado, transaccion};
    }
    catch (err) {
        throw err;
    }
}


async function getlistadoClientePendiente(placa) {
    try {

        //  console.log('servicio',placa, password)
        let sql = `
    set timezone ='America/Lima';
SELECT "id", "codigo_cliente", "direccion_nro", "fecha_entrega", "codigo_licencia", "codigo_chofer", "placa", "prioridad", "cuenta_albaran", "estado_planilla"
     , "hora_llegada", "hora_entrega", "encuesta_t_entrega", "encuesta_producto", "encuesta_documento", "motivo_rechazo_total", "distancia_hora_llegada"
     , "cerrado_foto", "incidente", "incidente_foto", "fin_ruta_hora", "fin_ruta_motivo", "fin_ruta_incidente", "fin_ruta_foto", "estado_libra", "x_llegada"
     , "y_llegada", "accuracy", "distancia_llegada", "finalizado"
 FROM "transacciones" AS "transacciones"
 WHERE "transacciones"."placa" = '${placa}'
   AND ("transacciones"."finalizado" = false OR "transacciones"."finalizado" IS NULL)

   AND "transacciones"."fecha_entrega" = date(NOW());

     `;
        console.log(sql)

        const clientes = await models.sequelize.query(sql, {type: models.sequelize.QueryTypes.SELECT});

        console.log(clientes)

        if (!clientes) {
            throw {
                error: new Error("no existen clientes asignado para este dia : " ),
                message: "Clientes no asignados",
                status: 401
            };
        }

        return clientes;
    }
    catch (err) {
        throw err;
    }
}

async function finalizarCliente(transaccion, hora, motivo, incidente, foto) {

    const t = await models.sequelize.transaction();
    try {

        //  console.log('servicio',placa, password)
        let cliente = await models.transacciones.scope(null).findOne({
            where: {
                id: transaccion.id
            }
        });

        if (!cliente) throw {
            error: new Error("Cliente no encontrado Id: " + transaccion.codigo_cliente),
            message: "Cliente no encontrado",
            status: 404
        };

        cliente.estado_planilla = (cliente.estado_planilla==0)? 5: cliente.estado_planilla;
        cliente.finalizado=true;
        cliente.fin_ruta_hora = hora;
        cliente.fin_ruta_motivo = motivo;
        cliente.fin_ruta_incidente = incidente;
        cliente.fin_ruta_foto = foto;

        await cliente.save({t});
        t.commit().then();
        return cliente
    }
    catch (err) {
        throw err;
    }
}

/*Implementado la funcion del login de un transportista*/
async function distancia(pto_cliente, pto_marcado) {
    try {

        var from = turf.point([pto_marcado.latitud, pto_marcado.longitud]);
        var to = turf.point([pto_cliente.latitud, pto_cliente.longitud]);
        // var options = {units: 'meters'};
        var distance = turf.distance(from, to, 'meters');
        pto_marcado.distance = distance;
        return pto_marcado;
    }
    catch (err) {
        throw err;
    }
}

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('adquisicion_predial', {
        expediente_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        proyecto_codigo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expediente_codigo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expediente_titulares: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dni_ruc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        proyeccion_ejercicio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        grupos: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        clasificacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sector: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        inform_pred_denominacion_predio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        inform_pred_naturaleza_predio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        inform_pred_p_e_predio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        inform_pred_area_inscrita_matriz_m: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_inscrita_matriz_ha: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_directamente_afectada_m: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_directamente_afectada_ha: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_indirectamente_afectada_m: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_indirectamente_afectada_ha: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_remanente_m: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_remanente_ha: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_adquirida_m: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_area_adquirida_ha: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        inform_pred_tipoafectacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        tipo_personeria: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        condicion_juridica: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cajas: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        comentarios: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        profesional_responsable: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cbc_sunarp_num_oficio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cbc_sunarp_fecha_presentacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cbc_sunarp_en_sunarp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cbc_sunarp_fecha_expedicion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cbc_sunarp_cbc_expedido: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ofic_comuni_num_oficio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ofic_comuni_esnotificado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ofic_comuni_fecha_notificacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        anot_prevent_fecha_presentacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        anot_prevent_calificacion_sunarp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        anot_prevent_anotacion_inscrita: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_tasa_direc_nc_fecha_envio_dnc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_tasa_direc_nc_num_oficio_mtc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_tasa_direc_nc_en_dnc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_tasa_direc_nc_fecha_expedicion_tasacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_tasa_direc_nc_con_documento_tasacion_expedido: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        interv_perito_perito: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        interv_perito_fecha_informe: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        interv_perito_informe_digital: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        valor_informe_tasacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cri_solicitado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cri_expedido: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        para_publicacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        doc_publicacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        certiticado_predupuestal_cp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        certiticado_predupuestalnota_nro: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        certiticado_predupuestal_fecha: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remision_oficio_intension_remision_oficio_intension: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remision_oficio_intension_nro_oficio_intension: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        remision_oficio_intension_fecha_entrega: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        com_suj_pasi_mtc_aceptacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        com_suj_pasi_mtc_fecha_recepcion_comunicacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        com_suj_pasi_mtc_con_oposicion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        com_suj_pasi_mtc_entrega_anticipada: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        estado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_memo_ddp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_memo_dgppt: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_memo_envio_dgppt_dvt: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_memo_tiene_rm: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_fecha_expedicion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_fecha_publicacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_rm_numero_resolucion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        solicitud_devengado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_cheque_memo_finanzas_oga: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_cheque_memo_finanzas_oga_digital: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_cheque_fecha_memo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_cheque_modalidad_pago: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_cheque_nro_cheque_deposito_judicial: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_formulario_registral: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_formulario_registral_digital: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_acta_entrega_terreno: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_acta_entrega_terreno_digital: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_acta_de_fe_entrega_cheque_deposito: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        legalizaciones_notaria_legalizaciones_fr: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha_pago_deposito: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        monto_pagar: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pago_ejecutado: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_independ_inscrip_sunarp_nro_titulo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_independ_inscrip_sunarp_fecha_solicitud: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_independ_inscrip_sunarp_fecha_inscripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_independ_inscrip_sunarp_acto_inscrito_sunarp_favor_mtc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gest_independ_inscrip_sunarp_nueva_partida_registral: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_entrega_recepcion_predio_ddp_opat_acta_suscrita: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_entrega_recepcion_predio_ddp_opat_fecha_acta: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_entrega_recepcion_predio_ddp_opat_representante_opat: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gestion_entrega_recepcion_predio_ddp_opat_representante_ddp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        predios_en_arbitraje_en_arbitraje: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        predios_en_arbitraje_con_laudo_arbitral: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        predios_en_arbitraje_observaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expediente_finalizados_derivados_opat: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expediente_finalizados_observaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        directorio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        val_comer_predio_valor_terreno: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        val_comer_predio_valor_edificacion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        val_comer_predio_valor_plantaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        val_comer_predio_valor_comercial_vc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        perjuicio_economico_lucro_cesante: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        perjuicio_economico_danio_emergente: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        perjuicio_economico_valor_pe: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        valor_segun_tasacion_vc_pe: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        beneficio_veinte_ciento: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        impuesto_a_la_renta: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        valor_certificar: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        usuaregistra_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'adquisicion_predial',
        schema:'pred'
        
    });
};

//@ts-check
"use strict";
const models = require('../../models');
const uuidv1 = require('uuid/v1');
const proyecto=require('./tumbes').proyecto;
const predios=require('./tumbes').predios;

const solicitudService = require('./../../servicios/solicitud/solicitud');

module.exports = {
    obtener_poligono_proyecto,
    obtener_poligono_predio,
    obtener_poligono_interferencia
};


async function obtener_poligono_proyecto(req, res, next) {
    try {


        let proyecto2={...proyecto};
        delete proyecto2.features;
        let listageometrias=proyecto.features;
        let filtraods=
            listageometrias.filter(
                feature => feature.properties.pre_codigo === req.query.pre_codigo
            );
        proyecto2.features=filtraods;
        
        return res.status(200).send(proyecto2);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}



async function obtener_poligono_predio(req, res, next) {
    try {

        let proyecto2={...predios};
        delete proyecto2.features;
        let listageometrias=predios.features;
        let filtraods=
            listageometrias.filter(
                feature => feature.properties.pre_codigo === req.query.codigo
            );
        proyecto2.features=filtraods;

        return res.status(200).send(proyecto2);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}


async function obtener_poligono_interferencia(req, res, next) {
    try {

        let geojson_poroyecto=[
            {
                "geojson_3857": "\r\n{\r\n \"type\": \"FeatureCollection\",\r\n \"features\": [\r\n{\r\n     \"type\": \"Feature\",\r\n     \"properties\": {\r\n\"pre_id\":33\r\n,\"cap_id\":1\r\n,\"pre_codigo\":\"000481\"\r\n,\"pre_descripcion\":\"\"\r\n,\"pre_area_acad\":2426.21435546875\r\n,\"usuario_modifica\":\"juan ojeda\"\r\n,\"pre_fecha_modificacion\":\"2019-10-24 18:45:21.563627\"\r\n,\"pre_ip\":192\r\n,\"pre_epsg_ultimo\":32718\r\n     },\r\n     \"geometry\":\r\n     {\"type\":\"Polygon\",\"coordinates\":[[[-74.9994125524407,-12.4998076767161],[-74.9994640912973,-12.499778829892],[-74.9995087276208,-12.4997529672108],[-74.9995674450851,-12.4997160721762],[-74.9996618715828,-12.499645266206],[-74.999732921508,-12.4995903757288],[-74.9998285443615,-12.4995023881423],[-74.9999833446467,-12.4993712657768],[-74.9999979779593,-12.4993583343938],[-74.9999316218947,-12.499274325607],[-74.9998796230266,-12.4992953956054],[-74.9998378398604,-12.49931040684],[-74.9998021308935,-12.4993254180727],[-74.9997328297116,-12.4993595098423],[-74.9996961083643,-12.4993745210598],[-74.9996481589372,-12.4993885375361],[-74.9996145667262,-12.4993975804157],[-74.9995961600374,-12.4994005645543],[-74.9995726915114,-12.4994025539616],[-74.9995483026526,-12.4994035486437],[-74.9995166431605,-12.4994005644235],[-74.9994891251712,-12.4993985749292],[-74.9994473420062,-12.4993945959597],[-74.9994147621733,-12.4993955906126],[-74.999389268909,-12.4993984842924],[-74.9993658003691,-12.4994056281493],[-74.999337269977,-12.4994176551716],[-74.9992862833974,-12.4994396293505],[-74.99925876534,-12.4994606992925],[-74.9992342843762,-12.499483758684],[-74.9992210315142,-12.4994987699022],[-74.9992118281231,-12.4995137811317],[-74.9992016123502,-12.4995328616742],[-74.9991843098822,-12.4995889277598],[-74.9992433031971,-12.4996410151817],[-74.9992843500143,-12.499687224642],[-74.9993434353445,-12.4997632757939],[-74.9993783159178,-12.4998228687538],[-74.9994125524407,-12.4998076767161]]]}\r\n     }\r\n     \r\n  ,{\r\n     \"type\": \"Feature\",\r\n     \"properties\": {\r\n\"pre_id\":33\r\n,\"cap_id\":1\r\n,\"pre_codigo\":\"000481\"\r\n,\"pre_descripcion\":\"\"\r\n,\"pre_area_acad\":2426.21435546875\r\n,\"usuario_modifica\":\"DDP MTC\"\r\n,\"pre_fecha_modificacion\":\"2019-10-24 18:45:21.563627\"\r\n,\"pre_ip\":192\r\n,\"pre_epsg_ultimo\":32718\r\n     },\r\n     \"geometry\":\r\n     {\"type\":\"Polygon\",\"coordinates\":[[[-74.9994125524407,-12.4998076767161],[-74.9994640912973,-12.499778829892],[-74.9995087276208,-12.4997529672108],[-74.9995674450851,-12.4997160721762],[-74.9996618715828,-12.499645266206],[-74.999732921508,-12.4995903757288],[-74.9998285443615,-12.4995023881423],[-74.9999833446467,-12.4993712657768],[-74.9999979779593,-12.4993583343938],[-74.9999316218947,-12.499274325607],[-74.9998796230266,-12.4992953956054],[-74.9998378398604,-12.49931040684],[-74.9998021308935,-12.4993254180727],[-74.9997328297116,-12.4993595098423],[-74.9996961083643,-12.4993745210598],[-74.9996481589372,-12.4993885375361],[-74.9996145667262,-12.4993975804157],[-74.9995961600374,-12.4994005645543],[-74.9995726915114,-12.4994025539616],[-74.9995483026526,-12.4994035486437],[-74.9995166431605,-12.4994005644235],[-74.9994891251712,-12.4993985749292],[-74.9994473420062,-12.4993945959597],[-74.9994147621733,-12.4993955906126],[-74.999389268909,-12.4993984842924],[-74.9993658003691,-12.4994056281493],[-74.999337269977,-12.4994176551716],[-74.9992862833974,-12.4994396293505],[-74.99925876534,-12.4994606992925],[-74.9992342843762,-12.499483758684],[-74.9992210315142,-12.4994987699022],[-74.9992118281231,-12.4995137811317],[-74.9992016123502,-12.4995328616742],[-74.9991843098822,-12.4995889277598],[-74.9992433031971,-12.4996410151817],[-74.9992843500143,-12.499687224642],[-74.9993434353445,-12.4997632757939],[-74.9993783159178,-12.4998228687538],[-74.9994125524407,-12.4998076767161]]]}\r\n     }\r\n     \r\n  ,{\r\n     \"type\": \"Feature\",\r\n     \"properties\": {\r\n\"pre_id\":33\r\n,\"cap_id\":1\r\n,\"pre_codigo\":\"000481\"\r\n,\"pre_descripcion\":\"\"\r\n,\"pre_area_acad\":2426.21435546875\r\n,\"usuario_modifica\":\"Luis Torres\"\r\n,\"pre_fecha_modificacion\":\"2019-10-24 18:45:21.563627\"\r\n,\"pre_ip\":192\r\n,\"pre_epsg_ultimo\":32718\r\n     },\r\n     \"geometry\":\r\n     {\"type\":\"Polygon\",\"coordinates\":[[[-74.9994125524407,-12.4998076767161],[-74.9994640912973,-12.499778829892],[-74.9995087276208,-12.4997529672108],[-74.9995674450851,-12.4997160721762],[-74.9996618715828,-12.499645266206],[-74.999732921508,-12.4995903757288],[-74.9998285443615,-12.4995023881423],[-74.9999833446467,-12.4993712657768],[-74.9999979779593,-12.4993583343938],[-74.9999316218947,-12.499274325607],[-74.9998796230266,-12.4992953956054],[-74.9998378398604,-12.49931040684],[-74.9998021308935,-12.4993254180727],[-74.9997328297116,-12.4993595098423],[-74.9996961083643,-12.4993745210598],[-74.9996481589372,-12.4993885375361],[-74.9996145667262,-12.4993975804157],[-74.9995961600374,-12.4994005645543],[-74.9995726915114,-12.4994025539616],[-74.9995483026526,-12.4994035486437],[-74.9995166431605,-12.4994005644235],[-74.9994891251712,-12.4993985749292],[-74.9994473420062,-12.4993945959597],[-74.9994147621733,-12.4993955906126],[-74.999389268909,-12.4993984842924],[-74.9993658003691,-12.4994056281493],[-74.999337269977,-12.4994176551716],[-74.9992862833974,-12.4994396293505],[-74.99925876534,-12.4994606992925],[-74.9992342843762,-12.499483758684],[-74.9992210315142,-12.4994987699022],[-74.9992118281231,-12.4995137811317],[-74.9992016123502,-12.4995328616742],[-74.9991843098822,-12.4995889277598],[-74.9992433031971,-12.4996410151817],[-74.9992843500143,-12.499687224642],[-74.9993434353445,-12.4997632757939],[-74.9993783159178,-12.4998228687538],[-74.9994125524407,-12.4998076767161]]]}\r\n     }\r\n     \r\n  ,{\r\n     \"type\": \"Feature\",\r\n     \"properties\": {\r\n\"pre_id\":33\r\n,\"cap_id\":1\r\n,\"pre_codigo\":\"000481\"\r\n,\"pre_descripcion\":\"\"\r\n,\"pre_area_acad\":2426.21435546875\r\n,\"usuario_modifica\":\"Manuel Ccusi\"\r\n,\"pre_fecha_modificacion\":\"2019-10-24 18:45:21.563627\"\r\n,\"pre_ip\":192\r\n,\"pre_epsg_ultimo\":32718\r\n     },\r\n     \"geometry\":\r\n     {\"type\":\"Polygon\",\"coordinates\":[[[-74.9994125524407,-12.4998076767161],[-74.9994640912973,-12.499778829892],[-74.9995087276208,-12.4997529672108],[-74.9995674450851,-12.4997160721762],[-74.9996618715828,-12.499645266206],[-74.999732921508,-12.4995903757288],[-74.9998285443615,-12.4995023881423],[-74.9999833446467,-12.4993712657768],[-74.9999979779593,-12.4993583343938],[-74.9999316218947,-12.499274325607],[-74.9998796230266,-12.4992953956054],[-74.9998378398604,-12.49931040684],[-74.9998021308935,-12.4993254180727],[-74.9997328297116,-12.4993595098423],[-74.9996961083643,-12.4993745210598],[-74.9996481589372,-12.4993885375361],[-74.9996145667262,-12.4993975804157],[-74.9995961600374,-12.4994005645543],[-74.9995726915114,-12.4994025539616],[-74.9995483026526,-12.4994035486437],[-74.9995166431605,-12.4994005644235],[-74.9994891251712,-12.4993985749292],[-74.9994473420062,-12.4993945959597],[-74.9994147621733,-12.4993955906126],[-74.999389268909,-12.4993984842924],[-74.9993658003691,-12.4994056281493],[-74.999337269977,-12.4994176551716],[-74.9992862833974,-12.4994396293505],[-74.99925876534,-12.4994606992925],[-74.9992342843762,-12.499483758684],[-74.9992210315142,-12.4994987699022],[-74.9992118281231,-12.4995137811317],[-74.9992016123502,-12.4995328616742],[-74.9991843098822,-12.4995889277598],[-74.9992433031971,-12.4996410151817],[-74.9992843500143,-12.499687224642],[-74.9993434353445,-12.4997632757939],[-74.9993783159178,-12.4998228687538],[-74.9994125524407,-12.4998076767161]]]}\r\n     }\r\n     \r\n  \r\n ]\r\n}"
            }
        ]
        return res.status(200).send(geojson_poroyecto);
    }
    catch (err) {
        //  t.rollback();
        return next(err);
    }
}
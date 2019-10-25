const compraService = require('../../compras/compras');
const { PayloadToken, ProductoToken } = require('../../../domain/ValueObjects/PayloadToken');
const moment = require('moment');

const tiposPrivilegios = {
   // directorio, muestra entidad pero no estadística
   "IDENTITY": {
      "NONE": 0, //no adquiró el perfil
      "A": 1, //paquete esencial
      "B": 2, //avanzado
      "C": 3, //analitico,
      "ALL": 4 //soy yo
   },
   //ranking, muestra estadistica pero no identidad
   "STATISTICS": {
      "NONE": 10, //no adquirio el perfil
      "A": 11, //avanzado
      "B": 12, //analítico
      "ALL": 13 //soy yo
   }
};
/**
 * 
 * @param {number} userId 
 * @param {PayloadToken} [actualPayload]
 * @param {object} [opts] 
 * @param {object} [opts.transaction]
 * @return {Promise<ProductoToken[]>}
 */
const getProfilePrivileges = async (userId, actualPayload, { transaction } = {}) => {
   try {
      const miscompras = await getBoughtProducts(userId, { transaction });
      let productsPrivileges = [];
      miscompras.forEach(compra =>
         compra.ProductosHistoricos.forEach(producto =>
            productsPrivileges.push(getProductPrivilegesData(producto))
         )
      );
      //@ts-ignore
      if (!actualPayload) actualPayload = { data: {} };
      actualPayload.data.profiles = productsPrivileges;

      return actualPayload.data.profiles;

   } catch (error) {
      throw error;
   }
};
/**
 * Trae las compras del usuario, y si tiene varios perfiles comprados de la misma gama
 * devuelve el de mayor privilegio
 * @param {number} userId 
 * @param {object} [opts] 
 * @param {object} [opts.transaction]
 * @return {Promise<Object[]>} array productos
 */
const getBoughtProducts = async (userId, { transaction } = {}) => {
   let miscompras = await compraService.getComprasUsuario(userId, { transaction });
   miscompras.forEach(compra => {
      compra.ProductosHistoricos = compra.ProductosHistoricos.reduce((acc, value) => {
         const indexProductoAcc = acc.findIndex(productoAcc =>
            productoAcc.ProfesionalesEstadisticaId == value.ProfesionalesEstadisticaId &&
            productoAcc.tipo == value.tipo);
         if (indexProductoAcc > -1) {
            if (acc[indexProductoAcc].gama < value.gama) {
               acc[indexProductoAcc] = value;
            }
         } else {
            acc.push(value);
         }
         return acc;
      }, []);
   });
   return miscompras;
};
/**
 * @param {object} product - objecto Producto
 * @return {ProductoToken} nivelAccesso - nivel del acceso a un producto
 */
const getProductPrivilegesData = (product) => {
   try {
      const tipoProducto = product.tipo && product.tipo.toUpperCase();
      const gamaProducto = product.gama && product.gama.toUpperCase();
      const privilegio = tiposPrivilegios[tipoProducto][gamaProducto];
      const expiracion = moment(product.createdAt).add(20, 'days').unix();
      const profesionalId = product.tipo == 'identity' ?
         product.ProfesionalesEstadisticaId : product.ProfesionalesEstadistica.anonymous_id;

      return new ProductoToken({ accessLevel: privilegio, expirationDate: expiracion, profesionalId: profesionalId });
   } catch (error) {
      throw error;
   }
};
/**
 * Devulvee si tiene acceso
 * @param {number} accessLevel - nivel de acceso en en un tipo de acceso (NONE, A,etc...)
 * @param {object} accessLevel - nivel de acceso 
 * @param {string} accessLevel.identity - el nivel minimo necesario para que tenga acceso
 * @param {string} accessLevel.statistics - el nivel minimo necesario para que tenga acceso
 * @return {boolean} bool
 */
const hasAccess = (accessLevel, { identity, statistics }) => {
   const accessType = getAccessType(accessLevel).toUpperCase();
   identity = identity && identity.toUpperCase();
   statistics = statistics && statistics.toUpperCase();
   if (tiposPrivilegios[accessType][accessType == "IDENTITY" ? identity : statistics] <= accessLevel)
      return true;
   else
      return false;
};
/**
 * Devuelve el tipo de acceso
 * @param {number} access - el tipo de acceso
 * @return {string} tipo - tipo de acceso: "identity" o "statistics"
 */
const getAccessType = (access) => {
   let accessType;
   if (tiposPrivilegios["IDENTITY"]["NONE"] <= access && access <= tiposPrivilegios["IDENTITY"]["ALL"])
      accessType = "identity";
   else if (tiposPrivilegios["STATISTICS"]["NONE"] <= access && access <= tiposPrivilegios["STATISTICS"]["ALL"])
      accessType = "statistics";
   else throw new Error("Acceso no conocido");

   return accessType;
};
/**
 * @typedef {Object} TiposPrivilegios
 * @property {Object} IDENTITY
 * @property {number} IDENTITY.NONE
 * @property {number} IDENTITY.A
 * @property {number} IDENTITY.B
 * @property {number} IDENTITY.C
 * @property {number} IDENTITY.ALL
 * @property {Object} STATISTICS
 * @property {number} STATISTICS.NONE
 * @property {number} STATISTICS.A
 * @property {number} STATISTICS.B  
 * @property {number} STATISTICS.ALL
 * @return {TiposPrivilegios} 
 * 
 */
const getTiposPrivilegios = () => {
   return tiposPrivilegios;
}

module.exports = {
   getTiposPrivilegios, getProfilePrivileges, hasAccess
};
const models = require('../../models');
const bcrypt = require('bcrypt');
module.exports = {
   /**
       Devuelve los datos de un usuario después de comprobar que su email y contraseña coinciden con los guardados en la base de datos.
       Puede devolver un Profesional o un Cliente.
       @param {string} id
       @param {string} password
       @returns {Promise<boolean>}
   */
   cambiarPassword: async (id, password, passwordNueva) => {
      try {
         let user = await models.Usuarios.scope(null).findOne({
            where: {
               id: id
            }
         });
         if (!user) throw { error: new Error("Usuario no encontrado. Id: " + id), message: "Usuario no encontrado", status: 404 };
         let compare = await bcrypt.compare(password, user.password);
         if (!compare) throw { error: new Error("Password incorrecta. Id: " + id), message: "Contraseña actual incorrecta", status: 409 };
         user.password = await bcrypt.hash(passwordNueva, 8, null);
         await user.save();
         return true;
      }
      catch (err) {
         throw err;
      }
   },
   /**
    * Crea o actualiza los datos de facturacion de un usuario
    * @param {number} userId
    * @param {object} datosFacturacion
    * @param {object} [opts]
    * @param {object} [opts.transaction]
    * @return {Promise<object>} datos
    */
   updateDatosFacturaciones: async (userId, datosFacturacion, opts = {}) => {
      let datos = await models.DatosFacturaciones.findOne({
         include: [{
            model: models.Usuarios,
            where: {
               id: userId
            },
            transaction: opts.transaction
         }]
      });
      if (!datos) {
         datos = new models.DatosFacturaciones();
         datos.UsuarioId = userId;
      }
      datos.nif = datosFacturacion.nif;
      datos.nombre = datosFacturacion.nombre;
      datos.domicilio = datosFacturacion.domicilio;
      datos.iban = datosFacturacion.iban;
      datos.provincia = datosFacturacion.provincia;
      datos.cp = datosFacturacion.cp;
      datos.tieneIRPF = datosFacturacion.tieneIRP;
      datos.localidad = datosFacturacion.localidad;
      await datos.save({ transaction: opts.transaction });
      return datos;
   },
   /**
    * Crea o actualiza las condiciones de privacidad y noticas del usuario
    * @param {boolean} isNoticiasActive aceptado recibir noticias (registro o contacto)
    * @param {boolean} isPrivacityAcept aceptadas condiciones (registro o contacto)
    * @param {string} userEmail email del usuario
    * @param {number} userId id del usuario
    * @param {boolean} registro true si es un registro, false si es un contacto
    * @param {object} [transaction]
    */

   updateConditions: async (isNoticiasActive, isPrivacityAcept, userEmail, userId, registro, t) => {
      try {
         var metaUser = await models.MetaFront.findOne({
            where: {
               UsuarioId: userId
            }
         });
         if (!metaUser) metaUser = await new models.MetaFront();
         if (registro) {
            metaUser.noticiasRegistro = isNoticiasActive;
            metaUser.privacidadRegistro = isPrivacityAcept;
         }
         else {
            metaUser.noticiasContacto = isNoticiasActive;
            metaUser.privacidadContacto = isPrivacityAcept;
         }
         metaUser.userEmail = userEmail;
         metaUser.UsuarioId = userId;
         await metaUser.save({
            transaction: t
         });
      } catch (e) {
         throw e;
      }
   },
   /**
    * Devuelve true ya existe un usuario con el mismo email
    * @param {string} email
    * @return {Promise<boolean>} 
    */
   existEmail: async (email) => {
      try {
         let usuario = await models.Usuarios.findOne({
            where: {
               email: email
            }
         });
         if (!usuario) return false;
         return true;
      } catch (err) {
         throw err;
      }
   }
};

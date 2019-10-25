const models = require('../../models');
const bcrypt = require('bcrypt');
const tokenInfra = require('./../../infra/jwt/jwt');
const privilegesPerfilesService = require('./../../servicios/auth/privilegios/perfiles');
const roleProfileService = require('./../../servicios/auth/roles/role');

module.exports = {
   /**
       Devuelve los datos de un usuario después de comprobar que su email y contraseña coinciden con los guardados en la base de datos.
       Puede devolver un Profesional o un Cliente.
       @param {string} email
       @param {string} password
       @returns {Promise<{user: any, token: any}>}
   */
   signIn: async (email, password) => {
      try {
         let user = await models.Usuarios.scope(null).findOne({
            where: {
               email: email
            }
         });
         if (!user) throw { error: new Error("Usuario no encontrado. Email: " + email), message: "Usuario o contraseña incorrectos", status: 401 };
         let compare = await bcrypt.compare(password, user.password);
         if (!compare) throw { error: new Error("Password incorrecta. Email: " + email), message: "Usuario o contraseña incorrectos", status: 401 };
         if (user.tipo == 0 || user.tipo == 2) {
            user = await models.Profesionales.findOne({
               where: {
                  id: user.id
               },
               include: [
                  {
                     model: models.Usuarios.scope(null),
                     include: [models.DatosFacturaciones, models.MetaFront]
                  },
                  {
                     model: models.ProfesionalesEstadisticas,
                     where: {
                        is_registered: true,
                     }
                  }
               ]
            });
            if (user.Usuario.reset_password_token) {
               user.Usuario.reset_password_token = null;
               user.Usuario.reset_password_expiration = null;
               await user.Usuario.save();
            }

         }
         else {
            user = await models.Clientes.findOne({
               where: {
                  id: user.id
               },
               include: [
                  {
                     model: models.Usuarios.scope(null),
                     include: [models.DatosFacturaciones, models.MetaFront]
                  }
               ]
            });
            if (!user) throw { error: new Error("Cliente no encontrado. Email: " + email), message: "Usuario no encontrado", status: 401 };
            if (user.Usuario.reset_password_token) throw { error: new Error("Compruebe su correo. Confirme la cuenta o cambie la contraseña."), status: 400 }
         }
         let profilesPrivileges = await privilegesPerfilesService.getProfilePrivileges(user.id);
         let role = roleProfileService.getRoleFromUser(user.Usuario.tipo, user.tipo);
         let token = await tokenInfra.createTokenWithData(user.id, {
            profiles: profilesPrivileges,
            role
         });
         return {
            user,
            token
         };
      }
      catch (err) {
         throw err;
      }
   }
};
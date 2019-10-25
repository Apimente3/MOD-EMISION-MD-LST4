/**
 * @param {number} userType 
 * @param {number} [profesionalType]
 * @return {('administrador'|'client'|'lawyer')}
 */
const getRoleFromUser = (userType, profesionalType) => {
   let role;
   if (userType == 0) {
      if (profesionalType == 2) role = "administrator";
      else if (0 <= profesionalType && profesionalType <= 1) role = "lawyer";
      else return;
   }
   else if (userType == 1) role = "client";
   //@ts-ignores
   return role;
};

module.exports = {
   getRoleFromUser
};
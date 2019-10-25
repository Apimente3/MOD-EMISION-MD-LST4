const ProductoToken = class ProductoToken {
   /**
    * @param {object} productoToken
    * @param {number} productoToken.accessLevel - acceso
    * @param {number} productoToken.expirationDate - expiracion de la validez de acceso
    * @param {number | string} productoToken.profesionalId - idel del profesional al cual tiene acceso
    */
   constructor(productoToken) {
      this.accessLevel = productoToken.accessLevel;
      this.expirationDate = productoToken.expirationDate;
      this.profesionalId = productoToken.profesionalId;
   }
};

const PayloadToken = class PayloadToken {
   /**
    * @param {object} payload - data del payload del token
    * @param {number} payload.sub - id publico del sujeto poseedor del token
    * @param {number} [payload.iat] - fecha de creacion del token
    * @param {Date} [payload.exp] - fecha de expiracion del token
    * @param {object} payload.data - data propia del negocio
    * @param {ProductoToken[]} payload.data.profiles - array perfiles a los que tiene acceso
    * @param {('administrador'|'client'|'lawyer')} payload.data.role - rol que tiene como usuario: administrador, cliente,abogado
    */
   constructor(payload) {
      this.sub = payload.sub;
      this.iat = payload.iat;
      this.exp = payload.exp;
      this.data = payload.data;
      if (this.data && this.data.profiles)
         this.data.profiles = payload.data.profiles.map(producto => new ProductoToken(producto));
      if (this.data && this.data.role)
         this.data.role = payload.data.role;
   }
};
module.exports = {
   ProductoToken, PayloadToken
};
const config = require('./../../config/config');
//@ts-ignore
const stripe = require('stripe')(config.stripe_key);

/**
 * Crea unha tarjeta a un cliente existente de stripe
 * @param {string} userToken 
 * @param {{number: number, exp_month: number, exp_year: number, cvc: number}} dataCard 
 * @return {Promise<object>} cardStripe
 */
const newStripeCard = async (userToken, dataCard) => {
   try {
      const token = await stripe.tokens.create({
         card: {
            number: dataCard.number,
            exp_month: dataCard.exp_month,
            exp_year: dataCard.exp_year,
            cvc: dataCard.cvc
         }
      });

      const card = await stripe.customers.createSource(userToken, {
         source: token.id
      });

      return card;
   } catch (err) {
      throw err;
   }
};
/**
 * Crea unha tarjeta e un cliente stripe
 * @param {any} usuario 
 * @param {{number: number, exp_month: number, exp_year: number, cvc: number}} dataCard 
 * @return {Promise<{ stripeCustomer, cardStripe }>} stripeData
 */
const createStripeCustomerWithCard = async (usuario, dataCard) => {
   try {
      const token = await stripe.tokens.create({
         card: {
            number: dataCard.number,
            exp_month: dataCard.exp_month,
            exp_year: dataCard.exp_year,
            cvc: dataCard.cvc
         }
      });
      if (usuario.stripe_token) throw new Error("El usuario ya existe");

      const stripeCustomer = await stripe.customers.create({
         email: usuario.email,
         description: usuario.nombre + " " + usuario.apellidos + " (" + usuario.id + ")",
         source: token.id
      });

      return { stripeCustomer, cardStripe: stripeCustomer.sources.data[0] };
   } catch (err) {
      throw err;
   }
};

module.exports = {
   newStripeCard,
   createStripeCustomerWithCard
};
let env = process.env.NODE_ENV;

//console.log('asdasd')
console.log(env)

let keys = {
   facebookAuth: {
      'clientID': '126384494672148', // your App ID
      'clientSecret': 'db4a751ae38883f4fcff5223500bcc5b', // your App Secret
      'callbackURL': 'http://localhost:3000/api/auth/facebook/callback'
   },
   googleAuth: {
      'clientID': '190284078983-n44p9j0bai8inr627ro2fsbpq2hh5khn.apps.googleusercontent.com', // your App ID
      'clientSecret': 'wpzb5L2bQjeeSYEFAaziVqnP', // your App Secret
      'callbackURL': 'http://localhost:3000/api/auth/google/callback',
      'viewId': 'ga:148807492'
   },
   secret: "O2435o&//_dfew4123r&23%-..-ASD3",
   secret_cert: "23lj&/&__23:-%T$%&%/$%TE-$RGDSF",
   stripe_key: "sk_test_EMHJeAFGPUjvUas7uZ4yRzDt"
};

module.exports = keys;
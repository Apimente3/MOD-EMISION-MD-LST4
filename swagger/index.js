const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const definition = require('sequelize-json-schema');

module.exports = ({ router, models, routesControllers }) => {
   const options = {
      definition: {
         info: {
            title: 'API GESTION DE PREDIOS - Direccion de Disponibilidad de Predios', // Title (required)
            version: '1.0.0', // Version (required)
             description:'API para referida a la gestion de los predios en la Direccion de Disponibilidad de Predios del MTC'
         },
         basePath: '/api'
      },
      apis: routesControllers, // Path to the API docs
       "schemes" : [ "http", "https" ],
       "securityDefinitions" : {
           "OauthSecurity" : {
               "type" : "oauth2",
               "flow" : "implicit",
               "authorizationUrl" : "authurl",
               "tokenUrl" : "tokenurl",
               "scopes": {
                   "read": "Reads the data"
               }
           }
       },
       "security" : [
           {
               "OauthSecurity" : ["read"]
           }
       ]
   };
   let swaggerSpec = swaggerJSDoc(options);

   Object.keys(models)
      .filter(item => !(item == 'sequelize' || item == 'Sequelize'))
      .forEach((modelName) => {
         const modelDefinition = definition(models[modelName]);
         swaggerSpec.definitions[modelName] = modelDefinition;
      });

   router.use('/docs/predioV1', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
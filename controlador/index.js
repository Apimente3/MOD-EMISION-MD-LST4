const fs = require("fs");
const path = require("path");
const handleError = require('./../serverConfig/errorHandler');

module.exports = ({ router, app, io }) => {
    let routesControllers = [];
    fs.readdirSync(__dirname)
        .filter(x => !x.includes(".")) //cogemos directorios (entradas que no tienen extension o sin ".")
        .forEach(function (f1) {
            const routerFile = path.join(__dirname, f1, "routes.js");
            routesControllers.push(routerFile);
            require(routerFile)({ router, app, io });
        });
    //aplica todas as rutas anteriores
    app.use('/api/', router);
    //manejador de errores
    app.use(handleError);
    return routesControllers;
};
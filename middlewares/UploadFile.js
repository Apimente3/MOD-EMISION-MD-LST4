const multer = require('multer');
const moment = require('moment');
const {fileserverpath} = require('../config/fileServer');



function generateFinalName(originalfilename) {
    // return `${originalfilename}_${moment().unix()}.${originalfilename.split('.').pop()} `
    return `${moment().unix()}-${originalfilename}`
}


 async  function uploadarchivo(req, res, next) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //    cb(null, path.join(__dirname, '/../../public/uploads/'));
            cb(null, fileserverpath);
        },
        filename: function (req, file, cb) {
            let filename = generateFinalName(file.originalname);
            req.filenamesaved = filename;
            req.originalname = file.originalname;

            cb(null, filename);
        }
    })

    var upload = multer({storage: storage}).array("myfile", 1)
    upload(req, res, function (err) {

        console.log(req.body);

        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }


        next();
    })

}

async  function uploadarchivoMultiple  (req, res, next){

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //    cb(null, path.join(__dirname, '/../../public/uploads/'));
            cb(null, fileserverpath);
        },
        filename: function (req, file, cb) {
            let filename = generateFinalName(file.originalname);
            req.filenamesaved = filename;
            req.originalname = file.originalname;
            req.denominacionFile = req.body.denominacionFile;

            cb(null, filename);
        }
    })

    var upload = multer({storage: storage}).array("myfile", 1)
    upload(req, res, function (err) {

        console.log(req.body);
        req.denominacion=req.body.denominacion;

        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }


        next();
    })

}


module.exports = {
    uploadarchivo,
    uploadarchivoMultiple
}

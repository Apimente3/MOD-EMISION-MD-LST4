const uuidv1 = require('uuid/v1');

module.exports = {
    uploadFileMultiple
};


async function uploadFileMultiple(req, res, next) {
    try {
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }


        let file={
            id:uuidv1(),
            filename: filenamesaved,
            path: req.originalname,
            denominacion: req.body.denominacion,
            usuareg_id: req.userId
        }
       
        return res.status(200).send(file);
    } catch (err) {
        return next(err);
    }
}

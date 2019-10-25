//@ts-nocheck
/*const multer = require('multer');
const moment = require('moment');
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');*/

/*let url_uploads = '../UI/src/assets/images/profiles/';
if (env === 'test') {
    url_uploads = '../app/assets/images/profiles/';
} else if (env === 'production') {
    url_uploads = '../web/assets/images/profiles/';
    let dirPresus = '../presupuestos';
    let dirChatFiles = '../chatfiles';
    if (!fs.existsSync(dirPresus)) {
        fs.mkdirSync(dirPresus);
    }
    if (!fs.existsSync(dirChatFiles)) {
        fs.mkdirSync(dirChatFiles);
    }
}*/



function generateFinalName(originalfilename) {
    return `${originalfilename}_${moment().unix()}.${originalfilename.split('.').pop()} `
}

async function uploadarchivo(req, res, next) {



   var storage =multer.diskStorage({
          destination: function (req,file,cb) {
              cb(null, path.join(__dirname, '/../../public/uploads/'));
          },
          filename: function (req,file,cb) {
              let filename=generateFinalName(file.originalname);
              req.filenamesaved=filename;
              cb(null,filename);
          }
      })
  
      var upload=multer({storage:storage}).array(req.headers.inputfile,1)
  
      upload(req,res,function (err,next2=next) {
          
          if(err){
              return next2({
                  error: err,
                  message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                  status: 401
              });
          }
  
         
          next2();
      })
 

}



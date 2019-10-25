const winston = require('winston');
const path = require('path');
const fs = require('fs');
const logDir = 'logs'; // directory path you want to set
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

let logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }), new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', '4XX.log'),
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true
        }),
        winston.format.timestamp(),
        winston.format.simple()
      ),
    })
  ]
});

module.exports = logger;

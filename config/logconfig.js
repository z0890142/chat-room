
var log4js = require('log4js');
const fs = require('fs');

levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
};

function judgePath(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
}

log4js.configure({
    appenders: { 
        console: { type: 'console' },
        file: { 
            type: 'dateFile',
            filename: 'logs/chat',
            pattern:"-yyyy-MM-dd.log",
            alwaysIncludePattern: true 
        } 
    },
    categories: { 
        default: { appenders: ['console','file'], level: 'all' },
    },
    replaceConsole: true 
  });


exports.logger = function (name, level) {
    var logger = log4js.getLogger(name);
    logger.level=levels[level] || levels['debug'];
    return logger;
};

exports.use = function (app, level) {
    app.use(log4js.connectLogger(log4js.getLogger('logInfo'), {
        level: levels[level] || levels['debug'],
        format: ':method :url :status'
    }));
};

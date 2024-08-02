import winston from "winston";




const customLevelOptions = {

    levels: {

        falta: 0,

        error: 1,

        warning: 2,

        info: 3,

        debug: 4

    },

    colors: {

        falta: 'red',

        error: 'red',

        warning: 'yellow',

        info: 'green',

        debug: 'white'

    }

}




export const logger = winston.createLogger({

    levels: customLevelOptions.levels,

    transports: [

        new winston.transports.File({

            filename: './logs/log.log',

            level: 'warning',

            format: winston.format.printf(print => `${print.level}: ${[print.timestamp]}: ${print.message}`), 

        }),

        new winston.transports.File({

            filename: './logs/log.log',

            level: 'error',

            format: winston.format.simple(),

        }),

        new winston.transports.Console({

            leve: "info",

            format: winston.format.combine(

                winston.format.colorize({

                    colors: customLevelOptions.colors,

                }),

                winston.format.label({

                    label: `🏷️`

                }),

                winston.format.timestamp({

                    format: 'MMM-DD-YYYY HH:mm:ss',

                }),

                winston.format.printf(print => `${print.level}: ${print.label}: ${[print.timestamp]}: ${print.message}`),

            ),

        }),

    ]

});




export const addLogger = (req, res, next) => {

    req.logger = logger;

    next();

}
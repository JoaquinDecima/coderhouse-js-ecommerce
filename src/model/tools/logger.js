import winston from 'winston';

class Logger{
	constructor(){
		this.logger = winston.createLogger({
			format: winston.format.simple(),
			transports: [
				new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
				new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
				new winston.transports.Console({
					format: winston.format.combine(winston.format.colorize(), winston.format.simple())
				})
			]
		});
	}

	warn(mensaje){
		this.logger.warn(mensaje);
	}

	error(mensaje){
		this.logger.error(mensaje);
	}

	info(mensaje){
		this.logger.info(mensaje);
	}
}

export const logger = new Logger();
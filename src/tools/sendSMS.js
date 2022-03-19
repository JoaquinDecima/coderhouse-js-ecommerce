import twilio from 'twilio';
import 'dotenv/config';
import {logger} from './logger.js';

const acctSid = process.env.TWILIO_SMS_SID;
const authToken = process.env.TWILIO_SMS_TOKEN;

export default async function sendSMS(to, body, from = '541123882753'){
	// Uso try/catch para evitar que la falta de credenciales rompa
	try {
		const twilioClient = twilio(acctSid, authToken);
		await twilioClient.messages.create({ body, from, to });
	}
	catch (err) {
		logger.error(`Ocurio un error al enviar el SMS Error: ${err}`);
	}

}
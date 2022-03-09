import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'osbaldo.ferry4@ethereal.email',
		pass: 'AJkAPsbWZrstepPpvj'
	}
});

export default function sendMail(mail, destination, sender, title){
	transporter.sendMail({
		from: sender,
		to: destination,
		html: mail,
		subject: title
	});
}
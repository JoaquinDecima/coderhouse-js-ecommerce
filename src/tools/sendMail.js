import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'mireille.kuphal@ethereal.email',
		pass: 'zvhkS5J9AzwpdYUjwC',
	},
});

export default async function sendMail(mail, destination, sender, title) {
	transporter.sendMail({
		from: sender,
		to: destination,
		html: mail,
		subject: title,
	});
}

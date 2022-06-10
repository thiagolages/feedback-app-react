import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

// configuring nodemailer to send emails
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fb504631c0f186",
        pass: "2865fc0fafa5bb"
    }
});

export class NodeMailerMailAdapter implements MailAdapter{
    // wait for the email to be sent
    async sendMail (data: SendMailData){       
        transport.sendMail({
            from: "Feedget Team <oi@feedget.com>",
            // in development, this will just show up in our 'mailtrap.io' service to visualize, so it doesn't have to be a valid email
            // in production, this will actually be sent, so it needs to be a valid email address
            to: "Thiago Lages <thiagolagesrocha@gmail.com>", 
            subject: data.subject,
            html: data.body
        })
    }
}
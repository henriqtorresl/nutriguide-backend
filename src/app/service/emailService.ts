import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class EmailService {

    constructor() { }

    public async enviarEmail(
        transporter: Transporter<SMTPTransport.SentMessageInfo>,
        title: string,
        html: string,
        nomeQuemEnviou: string,
        emailReceptor: string | string[],
        emailReplyTo?: string
    ) {
        const mailSend = await transporter.sendMail({
            subject: title,
            html: html,
            from: nomeQuemEnviou,
            to: emailReceptor,
            replyTo: emailReplyTo
        });
    }

}
import { Request, Response } from "express";
import EmailService from "../service/emailService";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import PostService from "../service/postService";
import UsuarioComentario from "../models/UsuarioComentario";
import NutricionistaService from "../service/nutricionistaService";
import PacienteService from "../service/pacienteService";

export default class EmailController {

    private static service: EmailService;
    private static postService: PostService;
    private static nutricionistaService: NutricionistaService;
    private static pacienteService: PacienteService;
    private transport: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        EmailController.service = new EmailService();
        EmailController.postService = new PostService();
        EmailController.nutricionistaService = new NutricionistaService();
        EmailController.pacienteService = new PacienteService()

        this.transport = this.createTransport();
    }

    private createTransport(): Transporter<SMTPTransport.SentMessageInfo> {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'nutriguide018@gmail.com',
                pass: 'ogzi xssf wkma fhiu'
            },
            tls: {
                rejectUnauthorized: false,
            }
        });
    }

    public async postEmailCadastro(req: Request, res: Response) {
        const { emailPaciente, nome } = req.body;

        const title: string = 'Você foi cadastrado no sistema';
        const html: string =
            `
        <div>
            <h1>Olá, ${nome}</h1>
            <h2>Meus parabéns, você acabou de ser cadastrado no nosso sistema!</h2>
            <h2>Para acessar o site, basta informar o seu nome e seu email,</h2>
            <h2>clique no botão abaixo para visitar nosso site:</h2>
            <a href="https://nutriguide-req.netlify.app" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #28B225; color: #fff; border-radius: 5px;">Clique aqui para ir para o site</a>
            <h2>Muito obrigado!</h2>
        </div>
        `

        await EmailController.service.enviarEmail(this.transport, title, html, nome, emailPaciente);

        res.json({ msg: 'Email enviado com sucesso!' });
    }

    public async postEmailPlanoAlimentar(req: Request, res: Response) {
        const { emailPaciente, nome } = req.body;

        const title: string = 'Você possui um plano alimentar disponível para download!';
        const html: string =
            `
    <div>
        <h1>Olá, ${nome}</h1>
        <h2>Seu nutricionista acabou de criar um plano alimentar para você</h2>
        <h2>clique no botão abaixo para conferir seu plano no nosso site:</h2>
        <a href="https://nutriguide-req.netlify.app" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #28B225; color: #fff; border-radius: 5px;">Clique aqui para ir para o site</a>
        <h2>Muito obrigado!</h2>
    </div>
    `

        await EmailController.service.enviarEmail(this.transport, title, html, nome, emailPaciente);

        res.json({ msg: 'Email enviado com sucesso!' });
    }

    public async postMensagemNutri(req: Request, res: Response) {
        const { emailPaciente, nome, title, html, emailNutri } = req.body;

        await EmailController.service.enviarEmail(this.transport, title, html, nome, emailNutri, emailPaciente);

        res.json({ msg: 'Email enviado com sucesso!' });
    }

    public async postNotificarComentario(req: Request, res: Response) {
        const usuarioComentario: UsuarioComentario = req.body;

        const nutricionista = await EmailController.postService.getNutriByIdPost(usuarioComentario.id_post.toString());

        const title: string = `Novo comentário na sua publicação!`;
        const html: string =
            `
        <div>
            <h1>Olá, ${nutricionista.nome_usuario}</h1>
            <h2>${usuarioComentario.nome_usuario} comentou na sua publicação</h2>
            <h2>clique no botão abaixo para conferir as interações com suas postagens no nosso site:</h2>
            <a href="https://nutriguide-req.netlify.app" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #28B225; color: #fff; border-radius: 5px;">Clique aqui para ir para o site</a>
            <h2>Muito obrigado!</h2>
        </div>
        `

        await EmailController.service.enviarEmail(this.transport, title, html, usuarioComentario.nome_usuario, nutricionista.email, usuarioComentario.email);

        res.json({ msg: 'O nutricionista foi notificado sobre o comentário!' });
    }

    public async postNotificarPacientes(req: Request, res: Response) {
        const { nome } = req.body;

        const nutricionista = await EmailController.nutricionistaService.getOneNutricionistaByNomeUser(nome);
        const pacientes = await EmailController.pacienteService.getAllPacientesByNutriName(nutricionista!.nome_usuario.toString());

        const title: string = `Novo comentário na sua publicação!`;
        const html: string =
            `
    <div>
        <h1>Seu nutricionista ${nutricionista!.nome_usuario} fez uma nova publicação!</h1>
        <h2>Para ver a postagem nova do seu nutricionista entre no nosso site:</h2>
        <a href="https://nutriguide-req.netlify.app" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-align: center; text-decoration: none; background-color: #28B225; color: #fff; border-radius: 5px;">Clique aqui para ir para o site</a>
        <h2>Muito obrigado!</h2>
    </div>
    `

        const emails: string[] = pacientes!.map((p) => p.email);

        await EmailController.service.enviarEmail(this.transport, title, html, nutricionista!.nome_usuario, emails);

        res.json({ msg: 'Seus pacientes foram notificados sobre sua nova postagem!' });
    }

}
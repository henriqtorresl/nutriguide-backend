import { Router } from "express";
import nodemailer from "nodemailer";
import EmailService from "../service/emailService";
import NutricionistaService from "../service/nutricionistaService";
import PacienteService from "../service/pacienteService";
import UsuarioComentario from "../models/UsuarioComentario";
import PostService from "../service/postService";

const transport = nodemailer.createTransport({
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

const routesEmail = Router();

// email para notificar sobre cadastro
routesEmail.post('/email-cadastro', async (req, res) => {
    const { emailPaciente, nome  } = req.body;

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

    const service = new EmailService();
    await service.enviarEmail(transport, title, html, nome, emailPaciente);

    res.json({ msg: 'Email enviado com sucesso!' });
});

// email para notificar sobre o plano alimentar
routesEmail.post('/email-plano-alimentar', async (req, res) => {
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

    const service = new EmailService();
    await service.enviarEmail(transport, title, html, nome, emailPaciente);

    res.json({ msg: 'Email enviado com sucesso!' });
});

// email para enviar uma mensagem para o nutricionista
routesEmail.post('/email-mensagem-nutricionista', async (req, res) => {
    const { emailPaciente, nome, title, html, emailNutri } = req.body;

    const service = new EmailService();
    await service.enviarEmail(transport, title, html, nome, emailNutri, emailPaciente);

    res.json({ msg: 'Email enviado com sucesso!' });
});

// notificar o nutricionista, por email de que comentaram em seu post
routesEmail.post('/email-notificar-comentario', async (req, res) => {
    const usuarioComentario: UsuarioComentario = req.body;

    const service = new EmailService();
    const postService = new PostService();

    const nutricionista = await postService.getNutriByIdPost(usuarioComentario.id_post.toString());

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

    await service.enviarEmail(transport, title, html, usuarioComentario.nome_usuario, nutricionista.email, usuarioComentario.email);

    res.json({ msg: 'O nutricionista foi notificado sobre o comentário!' });
});

// notificar pacientes, por email de que seu nutricionista fez um post
routesEmail.post('/email-notificar-pacientes', async (req, res) => {
    const { nome } = req.body;

    const service = new EmailService();
    const nutricionistaService = new NutricionistaService();
    const pacienteService = new PacienteService();

    const nutricionista = await nutricionistaService.getOneNutricionistaByNomeUser(nome);
    const pacientes = await pacienteService.getAllPacientesByNutriName(nutricionista!.nome_usuario.toString());

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

    await service.enviarEmail(transport, title, html, nutricionista!.nome_usuario, emails);

    res.json({ msg: 'Seus pacientes foram notificados sobre sua nova postagem!' });
});

export default routesEmail;
import { Router } from "express";
import EmailController from "../controller/emailController";

const routesEmail = Router();
const controller = new EmailController();

routesEmail.post('/email-cadastro', controller.postEmailCadastro);

routesEmail.post('/email-plano-alimentar', controller.postEmailPlanoAlimentar);

routesEmail.post('/email-mensagem-nutricionista', controller.postMensagemNutri);

routesEmail.post('/email-notificar-comentario', controller.postNotificarComentario);

routesEmail.post('/email-notificar-pacientes', controller.postNotificarPacientes);

export default routesEmail;
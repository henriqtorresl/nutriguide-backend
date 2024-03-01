import { Router } from "express";
import ComentarioController from "../controller/comentarioController";

const routesComentario = Router();
const controller = new ComentarioController();

routesComentario.get('/comentario', controller.getAll);

routesComentario.get('/comentario/:idPost', controller.getOne);

routesComentario.post('/comentario', controller.post);

export default routesComentario;
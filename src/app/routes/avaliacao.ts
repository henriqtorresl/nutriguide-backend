import { Router } from "express";
import AvaliacaoController from "../controller/avaliacaoController";

const routesAvaliacao = Router();
const controller = new AvaliacaoController();

routesAvaliacao.get('/avaliacao/:idNutricionista', controller.getById);

routesAvaliacao.post('/avaliacao', controller.post);

export default routesAvaliacao;
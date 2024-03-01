import { Router } from "express";
import RefeicaoController from "../controller/refeicaoController";

const routesRefeicao = Router();
const controller = new RefeicaoController();

routesRefeicao.get('/refeicao', controller.getAll);

export default routesRefeicao;
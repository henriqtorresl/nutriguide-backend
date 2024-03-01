import { Router } from "express";
import PlanoAlimentarController from "../controller/planoAlimentarController";

const routesPlanoAlimentar = Router();
const controller = new PlanoAlimentarController();

routesPlanoAlimentar.post('/plano-alimentar', controller.post);

routesPlanoAlimentar.get('/plano-alimentar', controller.getAll);

export default routesPlanoAlimentar;
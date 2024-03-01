import { Router } from "express";
import AlimentoController from "../controller/alimentoController";

const routesAlimento = Router();
const controller = new AlimentoController();

routesAlimento.post('/alimento', controller.post);

routesAlimento.get('/alimento/:idPaciente', controller.getByIdPaciente);

export default routesAlimento;
import { Router } from "express";
import ProgressoPacienteController from "../controller/progressoPacienteController";

const routesProgressoPaciente = Router();
const controller = new ProgressoPacienteController();

routesProgressoPaciente.get('/progresso-paciente/:idPaciente', controller.getByIdPaciente);

routesProgressoPaciente.post('/progresso-paciente', controller.post);

export default routesProgressoPaciente;
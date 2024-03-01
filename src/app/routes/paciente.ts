import { Router } from "express";
import PacienteController from "../controller/pacienteController";

const routesPaciente = Router();
const controller = new PacienteController();

routesPaciente.get('/paciente', controller.getAll);

routesPaciente.get('/paciente/:id', controller.getOne);

routesPaciente.get('/paciente-nome', controller.getPacienteByNomeUser);

routesPaciente.post('/paciente', controller.post);

routesPaciente.put('/paciente/:id', controller.edit);

export default routesPaciente;
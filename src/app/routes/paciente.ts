import { Router } from "express";
import PacienteService from "../service/pacienteService";
import UsuarioPaciente from "../models/UsuarioPaciente";

const routesPaciente = Router();

routesPaciente.get('/paciente', async (req, res) => {
    const { responsavel } = req.query;

    const service = new PacienteService();
    const pacientes = await service.getAllPacientesByNutriName(String(responsavel));

    res.status(200).json(pacientes);
});

routesPaciente.get('/paciente/:id', async (req, res) => {
    const { id } = req.params;

    const service = new PacienteService();
    const paciente = await service.getOnePaciente(id);

    if (paciente !== undefined) {
        res.status(200).json(paciente);
    } else {
        res.status(404).json({ msg: 'Paciente não encontrado!' })
    }

});

routesPaciente.get('/paciente-nome', async (req, res) => {
    const { nome } = req.query;

    const service = new PacienteService();
    const paciente = await service.getOnePacienteByNomeUser(String(nome));

    if (paciente !== undefined) {
        res.status(200).json(paciente);
    } else {
        res.status(404).json({ msg: 'Paciente não encontrado!' })
    }

});

routesPaciente.post('/paciente', async (req, res) => {
    const paciente: UsuarioPaciente = req.body;

    const service = new PacienteService();
    await service.insertPaciente(paciente);

    res.status(200).json({ msg: 'Paciente inserido com sucesso!' });
});

routesPaciente.put('/paciente/:id', async (req, res) => {
    const paciente: UsuarioPaciente = req.body;
    const { id } = req.params;

    const service = new PacienteService();
    await service.editPaciente(paciente, id);

    res.status(200).json({ msg: 'Paciente editado com sucesso!' });
});

export default routesPaciente;
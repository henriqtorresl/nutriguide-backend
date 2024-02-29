import { Router } from "express";
import ProgressoPaciente from "../models/ProgressoPaciente";
import ProgressoPacienteService from "../service/progressoPacienteService";

const routesProgressoPaciente = Router();

routesProgressoPaciente.get('/progresso-paciente/:idPaciente', async (req, res) => {
    const { idPaciente } = req.params;

    const service = new ProgressoPacienteService();
    const progresso: ProgressoPaciente[] | undefined = await service.getProgressoByIdPaciente(idPaciente);

    if (progresso !== undefined) {
        res.status(200).json(progresso);
    } else {
        res.status(404).json({ msg: 'Progressos não encontrados!' })
    }

});


routesProgressoPaciente.post('/progresso-paciente', async (req, res) => {
    const service = new ProgressoPacienteService();
    const progressoPaciente: ProgressoPaciente = req.body;

    await service.insertProgressoPaciente(progressoPaciente);

    res.json({ msg: 'Progresso do paciente registrado com sucesso!' });
});

export default routesProgressoPaciente;
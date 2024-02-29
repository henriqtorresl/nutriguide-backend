import { Router } from "express";
import Alimento from "../models/Alimento";
import AlimentoService from "../service/alimentoService";

const routesAlimento = Router();

routesAlimento.post('/alimento', async (req, res) => {
    const alimento: Alimento = req.body;

    const service = new AlimentoService();
    await service.insertAlimento(alimento);

    res.status(200).json({ msg: 'Alimento inserido com sucesso!' });
});

routesAlimento.get('/alimento/:idPaciente', async (req, res) => {
    const { idPaciente } = req.params;

    const service = new AlimentoService();
    const alimentos = await service.getAlimentasByIdPaciente(idPaciente);

    if (alimentos !== undefined && alimentos!.length !== 0) {
        res.status(200).json(alimentos);
    } else {
        res.status(404).json({ msg: 'Não foi encontrado nenhum alimento registrado para o paciente!' })
    }
});

export default routesAlimento;
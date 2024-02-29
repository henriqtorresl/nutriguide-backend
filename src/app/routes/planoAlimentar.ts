import { Router } from "express";
import PlanoAlimentar from "../models/PlanoAlimentar";
import PlanoAlimentarService from "../service/planoAlimentarService";

const routesPlanoAlimentar = Router();

routesPlanoAlimentar.post('/plano-alimentar', async (req, res) => {
    const plano: PlanoAlimentar = req.body;

    const service = new PlanoAlimentarService();
    await service.insertPlanoAlimentar(plano);

    res.status(200).json({ msg: 'Nome do plano alimentar criado com sucesso!' });
});

routesPlanoAlimentar.get('/plano-alimentar', async (req, res) => {
    const { nome } = req.query;

    const service = new PlanoAlimentarService();
    const plano = await service.getPlanoAlimentarByName(String(nome));

    if (plano !== undefined) {
        res.status(200).json(plano);
    } else {
        res.status(404).json({ msg: 'Não foi encontrado nenhum plano alimentar registrado para o paciente!' })
    }
});

export default routesPlanoAlimentar;
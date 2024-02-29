import { Router } from "express";
import Avaliacao from "../models/Avaliacao";
import AvaliacaoService from "../service/avaliacaoService";

const routesAvaliacao = Router();

routesAvaliacao.get('/avaliacao/:id', async (req, res) => {
    const { id } = req.params;

    const service = new AvaliacaoService();
    const avaliacao = await service.getAvaliacoesById(id);

    if (avaliacao !== undefined && avaliacao!.length !== 0) {
        res.status(200).json(avaliacao);
    } else {
        res.status(404).json({ msg: 'Não foi encontrado nenhuma avaliação sobre esse nutricionista' })
    }
});

routesAvaliacao.post('/avaliacao', async (req, res) => {
    const avaliacao: Avaliacao = req.body;

    const service = new AvaliacaoService();
    await service.insertAvaliacao(avaliacao);

    res.status(200).json({ msg: 'Avaliação cadastrada no sistema!' });
});

export default routesAvaliacao;
import { Router } from "express";
import RefeicaoService from "../service/refeicaoService";

const routesRefeicao = Router();

routesRefeicao.get('/refeicao', async (req, res) => {
    const service = new RefeicaoService();
    const refeicao = await service.getAllRefeicoes();

    res.status(200).json(refeicao);
});

export default routesRefeicao;
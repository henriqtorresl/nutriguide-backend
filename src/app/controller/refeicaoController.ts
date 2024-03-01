import { Request, Response } from "express";
import RefeicaoService from "../service/refeicaoService";

export default class RefeicaoController {

    private static service: RefeicaoService;

    constructor() {
        RefeicaoController.service = new RefeicaoService();
    }

    public async getAll(req: Request, res: Response) {
        const refeicao = await RefeicaoController.service.getAllRefeicoes();
    
        res.status(200).json(refeicao);
    }

}
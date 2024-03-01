import { Request, Response } from "express";
import RefeicaoService from "../service/refeicaoService";

export default class RefeicaoController {

    private static service: RefeicaoService;

    constructor() {
        RefeicaoController.service = new RefeicaoService();
    }

    public async getAll(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Refeição Resource']
        #swagger.description = 'Lista todos os tipos de refeição que temos cadastrados em nosso sistema'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const refeicao = await RefeicaoController.service.getAllRefeicoes();
    
        res.status(200).json(refeicao);
    }

}
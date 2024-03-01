import { Request, Response } from "express";
import AvaliacaoService from "../service/avaliacaoService";
import Avaliacao from "../models/Avaliacao";

export default class AvaliacaoController {

    private static service: AvaliacaoService;

    constructor() {
        AvaliacaoController.service = new AvaliacaoService();
    }

    public async getById(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Avaliação Resource']
        #swagger.description = 'Lista as avaliações de um nutricionista a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */

        const { idNutricionista } = req.params;

        const avaliacao = await AvaliacaoController.service.getAvaliacoesById(idNutricionista);
    
        if (avaliacao !== undefined && avaliacao!.length !== 0) {
            res.status(200).json(avaliacao);
        } else {
            res.status(404).json({ msg: 'Não foi encontrado nenhuma avaliação sobre esse nutricionista' })
        }
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Avaliação Resource']
        #swagger.description = 'Cria uma avaliação para um nutricionista'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */


        const avaliacao: Avaliacao = req.body;

        await AvaliacaoController.service.insertAvaliacao(avaliacao);
    
        res.status(200).json({ msg: 'Avaliação cadastrada no sistema!' });
    }

}
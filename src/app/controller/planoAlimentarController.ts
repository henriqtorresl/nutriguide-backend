import { Request, Response } from "express";
import PlanoAlimentarService from "../service/planoAlimentarService";
import PlanoAlimentar from "../models/PlanoAlimentar";

export default class PlanoAlimentarController {

    private static service: PlanoAlimentarService;

    constructor() {
        PlanoAlimentarController.service = new PlanoAlimentarService
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Plano Alimentar Resource']
        #swagger.description = 'Serviço que permite que um nutricionista crie um novo plano alimentar para um paciente'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Plano Alimentar',
            required: true,
            schema: {
                id_paciente: "number",
                nome_plano: "string"
            }
        }

        */

        const plano: PlanoAlimentar = req.body;

        await PlanoAlimentarController.service.insertPlanoAlimentar(plano);
    
        res.status(200).json({ msg: 'Nome do plano alimentar criado com sucesso!' });
    }

    public async getAll(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Plano Alimentar Resource']
        #swagger.description = 'Serviço que lista o plano alimentar de um paciente a partir de seu nome'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { nome } = req.query;

        const plano = await PlanoAlimentarController.service.getPlanoAlimentarByName(String(nome));
    
        if (plano !== undefined) {
            res.status(200).json(plano);
        } else {
            res.status(404).json({ msg: 'Não foi encontrado nenhum plano alimentar registrado para o paciente!' })
        }
    }

    teste() {}

}
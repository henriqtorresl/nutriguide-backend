import { Request, Response } from "express";
import NutricionistaService from "../service/nutricionistaService";

export default class NutricionistaController {

    private static service: NutricionistaService;

    constructor() {
        NutricionistaController.service = new NutricionistaService();
    }

    public async getAll(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Nutricionista Resource']
        #swagger.description = 'Lista todos os nutricionistas que estão cadastrados no sistema'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const nutricionista = await NutricionistaController.service.getAllNutricionistas();
    
        res.status(200).json(nutricionista);
    } 

    public async getOne(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Nutricionista Resource']
        #swagger.description = 'Lista um nutricionista a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { id } = req.params;

        const nutricionista = await NutricionistaController.service.getOneNutricionista(id);
    
        if (nutricionista !== undefined) {
            res.status(200).json(nutricionista);
        } else {
            res.status(404).json({ msg: 'Nutricionista não encontrado!' })
        }
    }

    public async getNutriByNomeUser(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Nutricionista Resource']
        #swagger.description = 'Lista os dados de um nutricionista a partir de seu nome'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { nome } = req.query;

        const nutricionista = await NutricionistaController.service.getOneNutricionistaByNomeUser(String(nome));

        if (nutricionista !== undefined) {
            res.status(200).json(nutricionista);
        } else {
            res.status(404).json({ msg: 'Nutricionista não encontrado!' })
        }
    }

    public async nutricionistaFiltro(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Nutricionista Resource']
        #swagger.description = 'Serviço que lista os nutricionistas a partir de um filtro, que pode receber os seguintes parâmetros: especialidade, nome ou região'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { nome, especialidade, regiao } = req.query;

        const nutricionistas = await NutricionistaController.service.getAllNutricionistasFiltered(String(nome), String(especialidade), String(regiao));
    
        if (nutricionistas !== undefined) {
            res.status(200).json(nutricionistas);
        } else {
            res.status(404).json({ msg: 'Não foi encontrado nenhum nutricionista com os parametros aplicados!' })
        }
    }

}
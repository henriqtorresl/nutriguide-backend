import { Request, Response } from "express";
import AlimentoService from "../service/alimentoService";
import Alimento from "../models/Alimento";

export default class AlimentoController {

    private static service: AlimentoService;

    constructor() {
        AlimentoController.service = new AlimentoService();
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Alimento Resource']
        #swagger.description = 'Insere um tipo de alimento'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Alimento',
            required: true,
            schema: {
                id_plano: "number",	
                id_refeicao: "number",	
                nome_alimento: "string",	
                quantidade_grama: "number",
                qnt_carboidrato: "number",	
                qnt_proteina: "number",
                qnt_gordura: "number"
            }
        }

        */
        
        const alimento: Alimento = req.body;

        await AlimentoController.service.insertAlimento(alimento);

        res.status(200).json({ msg: 'Alimento inserido com sucesso!' });
    }

    public async getByIdPaciente(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Alimento Resource']
        #swagger.description = 'Trás os alimentos cadastrados para um paciente, a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */

        const { idPaciente } = req.params;

        const alimentos = await AlimentoController.service.getAlimentasByIdPaciente(idPaciente);
    
        if (alimentos !== undefined && alimentos!.length !== 0) {
            res.status(200).json(alimentos);
        } else {
            res.status(404).json({ msg: 'Não foi encontrado nenhum alimento registrado para o paciente!' })
        }
    }

}
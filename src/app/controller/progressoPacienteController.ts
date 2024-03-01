import { Request, Response } from "express";
import ProgressoPacienteService from "../service/progressoPacienteService";
import ProgressoPaciente from "../models/ProgressoPaciente";

export default class ProgressoPacienteController {

    private static service: ProgressoPacienteService;

    constructor() {
        ProgressoPacienteController.service = new ProgressoPacienteService();
    }

    public async getByIdPaciente(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Progresso Paciente Resource']
        #swagger.description = 'Lista o progresso de um paciente a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { idPaciente } = req.params;

        const progresso: ProgressoPaciente[] | undefined = await ProgressoPacienteController.service.getProgressoByIdPaciente(idPaciente);
    
        if (progresso !== undefined) {
            res.status(200).json(progresso);
        } else {
            res.status(404).json({ msg: 'Progressos não encontrados!' })
        }
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Progresso Paciente Resource']
        #swagger.description = 'Serviço que permite que um nutricionista registre o progresso de um de seus pacientes'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Progresso do Paciente',
            required: true,
            schema: {
                id_paciente: "number";
                data: "Date",
                peso: "number",
                habitos_alimentares: "string",
                medidas_corporais: "string",
                queixa: "string",
                nivel_atividade_fisica: "string",
                suplementacao_atual: "string",
            }
        }

        */
        
        const progressoPaciente: ProgressoPaciente = req.body;

        await ProgressoPacienteController.service.insertProgressoPaciente(progressoPaciente);

        res.json({ msg: 'Progresso do paciente registrado com sucesso!' });
    }

}
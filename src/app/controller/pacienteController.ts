import { Request, Response } from "express";
import PacienteService from "../service/pacienteService";
import UsuarioPaciente from "../models/UsuarioPaciente";

export default class PacienteController {

    private static service: PacienteService;

    constructor() {
        PacienteController.service = new PacienteService();
    }

    public async getAll(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Paciente Resource']
        #swagger.description = 'Lista todos os pacientes de um nutricionista a partir do nome do nutricionista reponsável'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { responsavel } = req.query;

        const pacientes = await PacienteController.service.getAllPacientesByNutriName(String(responsavel));
    
        res.status(200).json(pacientes);
    }

    public async getOne(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Paciente Resource']
        #swagger.description = 'Lista um paciente a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { id } = req.params;

        const paciente = await PacienteController.service.getOnePaciente(id);
    
        if (paciente !== undefined) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ msg: 'Paciente não encontrado!' })
        }
    }

    public async getPacienteByNomeUser(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Paciente Resource']
        #swagger.description = 'Lista os dados de um paciente a partir de seu nome'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { nome } = req.query;

        const paciente = await PacienteController.service.getOnePacienteByNomeUser(String(nome));
    
        if (paciente !== undefined) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ msg: 'Paciente não encontrado!' })
        }
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Paciente Resource']
        #swagger.description = 'Serviço que permite realizar o cadastro de um novo paciente'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Usuário Paciente',
            required: true,
            schema: {
                cpf: "number",
                nome_usuario: "string",
                email: "string",
                sexo: "string",      
                telefone: "string",
                cep: "string",
                data_nascimento: "Date",
                tipo_usuario: "string",  
                peso: "number",
                altura: "number",
                queixa: "string",
                comorbidades: "string",
                medicacoes: "string",
                nutricionista_responsavel: "string"
            }
        }

        */
        
        const paciente: UsuarioPaciente = req.body;

        await PacienteController.service.insertPaciente(paciente);
    
        res.status(200).json({ msg: 'Paciente inserido com sucesso!' });
    }

    public async edit(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Paciente Resource']
        #swagger.description = 'Serviço que permite editar os dados de um paciente'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Usuário Paciente',
            required: true,
            schema: {
                id_usuario: "number",
                cpf: "number",
                nome_usuario: "string",
                email: "string",
                sexo: "string",     
                telefone: "string",
                cep: "string",
                data_nascimento: "Date",
                tipo_usuario: "string",
                id_paciente: "number",
                peso: "number",
                altura: "number",
                queixa: "string",
                comorbidades: "string",
                medicacoes: "string",
                nutricionista_responsavel: "string"
            }
        }

        */
        
        const paciente: UsuarioPaciente = req.body;
        const { id } = req.params;
    
        await PacienteController.service.editPaciente(paciente, id);
    
        res.status(200).json({ msg: 'Paciente editado com sucesso!' });
    }

}
import { Request, Response } from "express";
import PacienteService from "../service/pacienteService";
import UsuarioPaciente from "../models/UsuarioPaciente";

export default class PacienteController {

    private static service: PacienteService;

    constructor() {
        PacienteController.service = new PacienteService();
    }

    public async getAll(req: Request, res: Response) {
        const { responsavel } = req.query;

        const pacientes = await PacienteController.service.getAllPacientesByNutriName(String(responsavel));
    
        res.status(200).json(pacientes);
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;

        const paciente = await PacienteController.service.getOnePaciente(id);
    
        if (paciente !== undefined) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ msg: 'Paciente não encontrado!' })
        }
    }

    public async getPacienteByNomeUser(req: Request, res: Response) {
        const { nome } = req.query;

        console.log(nome);

        const paciente = await PacienteController.service.getOnePacienteByNomeUser(String(nome));
    
        if (paciente !== undefined) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ msg: 'Paciente não encontrado!' })
        }
    }

    public async post(req: Request, res: Response) {
        const paciente: UsuarioPaciente = req.body;

        await PacienteController.service.insertPaciente(paciente);
    
        res.status(200).json({ msg: 'Paciente inserido com sucesso!' });
    }

    public async edit(req: Request, res: Response) {
        const paciente: UsuarioPaciente = req.body;
        const { id } = req.params;
    
        await PacienteController.service.editPaciente(paciente, id);
    
        res.status(200).json({ msg: 'Paciente editado com sucesso!' });
    }

}
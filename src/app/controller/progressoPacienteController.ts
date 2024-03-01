import { Request, Response } from "express";
import ProgressoPacienteService from "../service/progressoPacienteService";
import ProgressoPaciente from "../models/ProgressoPaciente";

export default class ProgressoPacienteController {

    private static service: ProgressoPacienteService;

    constructor() {
        ProgressoPacienteController.service = new ProgressoPacienteService();
    }

    public async getByIdPaciente(req: Request, res: Response) {
        const { idPaciente } = req.params;

        const progresso: ProgressoPaciente[] | undefined = await ProgressoPacienteController.service.getProgressoByIdPaciente(idPaciente);
    
        if (progresso !== undefined) {
            res.status(200).json(progresso);
        } else {
            res.status(404).json({ msg: 'Progressos não encontrados!' })
        }
    }

    public async post(req: Request, res: Response) {
        const progressoPaciente: ProgressoPaciente = req.body;

        await ProgressoPacienteController.service.insertProgressoPaciente(progressoPaciente);

        res.json({ msg: 'Progresso do paciente registrado com sucesso!' });
    }

}
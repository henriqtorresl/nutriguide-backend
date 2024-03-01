import { Request, Response } from "express";
import AlimentoService from "../service/alimentoService";
import Alimento from "../models/Alimento";

export default class AlimentoController {

    private static service: AlimentoService;

    constructor() {
        AlimentoController.service = new AlimentoService();
    }

    public async post(req: Request, res: Response) {
        const alimento: Alimento = req.body;

        await AlimentoController.service.insertAlimento(alimento);

        res.status(200).json({ msg: 'Alimento inserido com sucesso!' });
    }

    public async getByIdPaciente(req: Request, res: Response) {
        const { idPaciente } = req.params;

        const alimentos = await AlimentoController.service.getAlimentasByIdPaciente(idPaciente);
    
        if (alimentos !== undefined && alimentos!.length !== 0) {
            res.status(200).json(alimentos);
        } else {
            res.status(404).json({ msg: 'Não foi encontrado nenhum alimento registrado para o paciente!' })
        }
    }

}
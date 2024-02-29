import ProgressoPacienteRepository from "../database/progressoPacienteRepository";
import ProgressoPaciente from "../models/ProgressoPaciente";

export default class ProgressoPacienteService {

    private repository: ProgressoPacienteRepository;

    constructor() {
        this.repository = new ProgressoPacienteRepository();
    }

    public async getProgressoByIdPaciente(idPaciente: string) {
        return await this.repository.getProgressoByIdPaciente(idPaciente);
    }

    public async insertProgressoPaciente(progresso: ProgressoPaciente) {
        return await this.repository.insertProgressoPaciente(progresso);
    }

}
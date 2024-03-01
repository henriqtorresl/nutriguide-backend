import AlimentoRepository from "../database/alimentoRepository";
import Alimento from "../models/Alimento";

export default class AlimentoService {

    private repository: AlimentoRepository;

    constructor() {
        this.repository = new AlimentoRepository();
    }

    public async insertAlimento(alimento: Alimento) {
        await this.repository.insertAlimento(alimento);
    }

    public async getAlimentasByIdPaciente(idPaciente: string) {
        return await this.repository.getAlimentasByIdPaciente(idPaciente);
    }

}
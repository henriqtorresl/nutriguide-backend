import PlanoAlimentarRepository from "../database/planoAlimentarRepository";
import PlanoAlimentar from "../models/PlanoAlimentar";

export default class PlanoAlimentarService {

    private repository: PlanoAlimentarRepository;

    constructor() {
        this.repository = new PlanoAlimentarRepository();
    }

    public async insertPlanoAlimentar(plano: PlanoAlimentar) {
        await this.repository.insertPlanoAlimentar(plano);
    }

    public async getPlanoAlimentarByName(nome: string) {
        return await this.repository.getPlanoAlimentarByName(nome);
    }

}
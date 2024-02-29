import NutricionistaRepository from "../database/nutricionistaRepository";

export default class NutricionistaService {

    private repository: NutricionistaRepository;

    constructor() {
        this.repository = new NutricionistaRepository();
    }

    public async getAllNutricionistas() {
        return await this.repository.getAllNutricionistas();
    }

    public async getOneNutricionista(idNutricionista: string) {
        return await this.repository.getOneNutricionista(idNutricionista);
    }

    public async getOneNutricionistaByNomeUser(nome: string) {
        return await this.repository.getOneNutricionistaByNomeUser(nome);
    }

    public async getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string) {
        return await this.repository.getAllNutricionistasFiltered(nome, especialidade, regiao);
    }

}
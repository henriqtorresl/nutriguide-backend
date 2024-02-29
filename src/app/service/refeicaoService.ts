import RefeicaoRepository from "../database/refeicaoRepository";

export default class RefeicaoService {

    private repository: RefeicaoRepository;

    constructor() {
        this.repository = new RefeicaoRepository();
    }

    public async getAllRefeicoes() {
        return await this.repository.getAllRefeicoes();
    }

}
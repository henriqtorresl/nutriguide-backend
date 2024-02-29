import AvaliacaoRepository from "../database/avaliacaoRepository";
import Avaliacao from "../models/Avaliacao";

export default class AvaliacaoService {

    private repository: AvaliacaoRepository;

    constructor() {
        this.repository = new AvaliacaoRepository();
    }

    public async getAvaliacoesById(idNutricionista: string) {
        return await this.repository.getAvaliacoesById(idNutricionista);
    }

    public async insertAvaliacao(avaliacao: Avaliacao) {
        return await this.repository.insertAvaliacao(avaliacao);
    }

}
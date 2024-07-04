import Avaliacao from '../models/Avaliacao';
import openDb from './../connection/configDb';
import avaliacao from '../resource/SQL/avaliacao.json';

export default class AvaliacaoRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getAvaliacoesById(idNutricionista: string): Promise<Avaliacao[] | undefined> {
        const result = await this.database.all(
            avaliacao.trazerPorIdNutricionista,
            [idNutricionista]
        );
        return result;
    }

    public async insertAvaliacao(aval: Avaliacao): Promise<void> {
        await this.database.run(
            avaliacao.inserir, 
            [aval.avaliacao, aval.nota_nutricionista, aval.id_nutricionista]
        );
    }
}
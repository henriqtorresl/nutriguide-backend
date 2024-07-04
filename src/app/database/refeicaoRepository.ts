import Refeicao from '../models/Refeicao';
import openDb from './../connection/configDb';
import refeicao from '../resource/SQL/refeicao.json';

export default class RefeicaoRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getAllRefeicoes(): Promise<Refeicao[] | undefined> {
        try {
            const result = await this.database.all(refeicao.trazerTodas);
            return result;
        } catch (err) {
            console.error('Error getting all meals:', err);
            throw err;
        }
    }

}

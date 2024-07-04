import PlanoAlimentar from '../models/PlanoAlimentar';
import openDb from './../connection/configDb';
import planoAlimentar from '../resource/SQL/planoAlimentar.json';

export default class PlanoAlimentarRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async insertPlanoAlimentar(plano: PlanoAlimentar): Promise<void> {
        try {
            await this.database.run(
                planoAlimentar.inserir, 
                [plano.id_paciente, plano.nome_plano]
            );
        } catch (err) {
            console.error('Error inserting diet plan:', err);
            throw err;
        }
    }

    public async getPlanoAlimentarByName(nome: string): Promise<PlanoAlimentar | undefined> {
        try {
            const result = await this.database.get(planoAlimentar.trazerPorNome, [nome]);
            return result;
        } catch (err) {
            console.error('Error getting diet plan by name:', err);
            throw err;
        }
    }
}

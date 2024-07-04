import Alimento from '../models/Alimento';
import openDb from './../connection/configDb';
import alimento from '../resource/SQL/alimento.json';
import AlimentoPlanoAlimentar from '../models/AlimentoPlanoAlimentar';

export default class AlimentoRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async insertAlimento(alimen: Alimento): Promise<void> {
        await this.database.run(
            alimento.inserir,
            [alimen.id_alimento, alimen.id_plano, alimen.id_refeicao, alimen.nome_alimento, alimen.quantidade_grama, alimen.qnt_carboidrato, alimen.qnt_proteina, alimen.qnt_gordura]
        );
    }

    public async getAlimentasByIdPaciente(idPaciente: string): Promise<AlimentoPlanoAlimentar[] | undefined> {
        const result = await this.database.all(
            alimento.trazerPlanoPorIdPaciente,
            [idPaciente]
        );
        return result;
    }
}
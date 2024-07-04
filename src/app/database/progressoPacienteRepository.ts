import ProgressoPaciente from '../models/ProgressoPaciente';
import openDb from './../connection/configDb';
import progressoPaciente from '../resource/SQL/progressoPaciente.json';

export default class ProgressoPacienteRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getProgressoByIdPaciente(idPaciente: string): Promise<ProgressoPaciente[] | undefined> {
        try {
            const result = await this.database.all(progressoPaciente.trazerPorIdPaciente, [idPaciente]);
            return result;
        } catch (err) {
            console.error('Error getting progress by patient ID:', err);
            throw err;
        }
    }

    public async insertProgressoPaciente(progresso: ProgressoPaciente): Promise<void> {
        try {
            await this.database.run(
                progressoPaciente.inserir, 
                [progresso.id_paciente, progresso.data, progresso.peso, progresso.habitos_alimentares, progresso.medidas_corporais, progresso.queixa, progresso.nivel_atividade_fisica, progresso.suplementacao_atual]
            );
        } catch (err) {
            console.error('Error inserting progress:', err);
            throw err;
        }
    }

}

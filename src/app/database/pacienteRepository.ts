import UsuarioPaciente from '../models/UsuarioPaciente';
import openDb from './../connection/configDb';
import paciente from '../resource/SQL/paciente.json';

export default class PacienteRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async insertPaciente(userPaciente: UsuarioPaciente, idUsuario: number): Promise<void> {
        try {
            await this.database.run(
                paciente.inserir, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idUsuario, userPaciente.nutricionista_responsavel]
            );
        } catch (err) {
            console.error('Error inserting patient:', err);
            throw err;
        }
    }

    public async editPaciente(userPaciente: UsuarioPaciente, idPaciente: string): Promise<void> {
        try {
            await this.database.run(
                paciente.atualizar, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idPaciente]
            );
        } catch (err) {
            console.error('Error editing patient:', err);
            throw err;
        }
    }

    public async getAllPacientesByNutriName(responsavel: string): Promise<UsuarioPaciente[] | undefined> {
        try {
            const result = await this.database.all(paciente.trazerTodos, [responsavel]);
            return result;
        } catch (err) {
            console.error('Error getting all patients by nutritionist name:', err);
            throw err;
        }
    }

    public async getOnePaciente(idPaciente: string): Promise<UsuarioPaciente | undefined> {
        try {
            const result = await this.database.get(paciente.trazerPorId, [idPaciente]);
            return result;
        } catch (err) {
            console.error('Error getting patient by ID:', err);
            throw err;
        }
    }

    public async getOnePacienteByNomeUser(nome: string): Promise<UsuarioPaciente | undefined> {
        try {
            const result = await this.database.get(paciente.trazerPorNomeUsuario, [nome]);
            return result;
        } catch (err) {
            console.error('Error getting patient by username:', err);
            throw err;
        }
    }
}

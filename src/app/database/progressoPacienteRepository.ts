import ProgressoPaciente from '../models/ProgressoPaciente';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import progressoPaciente from '../resource/SQL/progressoPaciente.json'

export default class ProgressoPacienteRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    getProgressoByIdPaciente(idPaciente: string): Promise<ProgressoPaciente[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<ProgressoPaciente[]>(
                progressoPaciente.trazerPorIdPaciente,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertProgressoPaciente(progresso: ProgressoPaciente): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query<any>(
                progressoPaciente.inserir, 
                [progresso.id_paciente, progresso.data, progresso.peso, progresso.habitos_alimentares, progresso.medidas_corporais, progresso.queixa, progresso.nivel_atividade_fisica, progresso.suplementacao_atual], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);

                        this.database.end();
                    }
            });
        });
    }

}
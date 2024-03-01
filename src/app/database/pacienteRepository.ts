import UsuarioPaciente from '../models/UsuarioPaciente';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import paciente from '../resource/SQL/paciente.json'

export default class PacienteRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }


    public async insertPaciente(userPaciente: UsuarioPaciente, idUsuario: number): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.inserir, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idUsuario, userPaciente.nutricionista_responsavel], 
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);

                         
                    }
            });
        });
    }

    public async editPaciente(userPaciente: UsuarioPaciente, idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.atualizar, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idPaciente], 
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);

                         
                    }
            });
        });
    }

    public async getAllPacientesByNutriName(responsavel: string): Promise<UsuarioPaciente[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerTodos,
                [responsavel],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async getOnePaciente(idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerPorId,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async getOnePacienteByNomeUser(nome: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerPorNomeUsuario,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

}
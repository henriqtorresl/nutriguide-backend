import UsuarioPaciente from '../models/UsuarioPaciente';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import paciente from '../resource/SQL/paciente.json'

export default class PacienteRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }


    public insertPaciente(userPaciente: UsuarioPaciente, idUsuario: number): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.inserir, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idUsuario, userPaciente.nutricionista_responsavel], 
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

    public editPaciente(userPaciente: UsuarioPaciente, idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.atualizar, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idPaciente], 
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

    getAllPacientesByNutriName(responsavel: string): Promise<UsuarioPaciente[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerTodos,
                [responsavel],  
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

    getOnePaciente(idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerPorId,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getOnePacienteByNomeUser(nome: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerPorNomeUsuario,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

}
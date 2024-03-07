import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import usuario from '../resource/SQL/usuario.json'
import Usuario from '../models/Usuario';

export default class UsuarioRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }


    public async findUserByName(nome: string): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(usuario.findByName, [nome], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result?.[0]);
                }
            });
        });
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(usuario.findById, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result?.[0]);
                }
            });
        });
    }

    public async insertUserPaciente(user: Usuario): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.inserirPaciente, 
                [user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario, user.tipo_usuario], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async insertUserNutricionista(user: Usuario): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.inserirNutricionista, 
                [user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario], 
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async trazUltimoIdInserido(): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.trazUltimoIdInserido,  
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async emailsCadastrados(): Promise<any[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<any[]>(
                usuario.trazEmailsCadastrados,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

}
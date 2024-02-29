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

                    this.database.end();
                } else {
                    resolve(result?.[0]);

                    this.database.end();
                }
            });
        });
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(usuario.findById, [id], (err, result) => {
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

    public async insertUserPaciente(user: Usuario): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.inserirPaciente, 
                [user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario, user.tipo_usuario], 
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

    public async trazUltimoIdInserido(): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.trazUltimoIdInserido,  
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
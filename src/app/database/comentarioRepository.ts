import Comentario from '../models/Comentario';
import UsuarioComentario from '../models/UsuarioComentario';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import comentario from '../resource/SQL/comentario.json'

export default class ComentarioRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async getAllComentario(): Promise<UsuarioComentario[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioComentario[]>(
                comentario.trazerTodosComentarios,
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

    public async getAllComentarioByIdPost(idPost: string): Promise<any[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<any[]>(
                comentario.trazerTodosComentariosByIdPost,
                [idPost],  
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

    public async insertComentario(coment: Comentario): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                comentario.inserir, 
                [coment.data_criacao, coment.conteudo, coment.id_post, coment.id_usuario], 
                (err, result) => {
                    if (err) {
                        console.log('erro: ', err);

                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

}
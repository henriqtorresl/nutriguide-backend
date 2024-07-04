import Comentario from '../models/Comentario';
import UsuarioComentario from '../models/UsuarioComentario';
import openDb from './../connection/configDb';
import comentario from '../resource/SQL/comentario.json';

export default class ComentarioRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getAllComentario(): Promise<UsuarioComentario[] | undefined> {
        try {
            const result = await this.database.all(comentario.trazerTodosComentarios);
            return result;
        } catch (err) {
            console.error('Error getting all comments:', err);
            throw err;
        }
    }

    public async getAllComentarioByIdPost(idPost: string): Promise<any[] | undefined> {
        try {
            const result = await this.database.all(comentario.trazerTodosComentariosByIdPost, [idPost]);
            return result;
        } catch (err) {
            console.error('Error getting comments by post ID:', err);
            throw err;
        }
    }

    public async insertComentario(coment: Comentario): Promise<void> {
        try {
            await this.database.run(comentario.inserir, [coment.data_criacao, coment.conteudo, coment.id_post, coment.id_usuario]);
        } catch (err) {
            console.error('Error inserting comment:', err);
            throw err;
        }
    }
}

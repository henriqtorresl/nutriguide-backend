import ComentarioRepository from "../database/comentarioRepository";
import Comentario from "../models/Comentario";

export default class ComentarioService {

    private repository: ComentarioRepository;

    constructor() {
        this.repository = new ComentarioRepository();
    }

    public async getAllComentario() {
        return await this.repository.getAllComentario();
    }

    public async getAllComentarioByIdPost(idPost: string) {
        return await this.repository.getAllComentarioByIdPost(idPost);
    }

    public async insertComentario(comentario: Comentario) {
        return await this.repository.insertComentario(comentario);
    }

}
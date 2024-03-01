import { Request, Response } from "express";
import ComentarioService from "../service/comentarioService";
import Comentario from "../models/Comentario";

export default class ComentarioController {

    private static service: ComentarioService;

    constructor() {
        ComentarioController.service = new ComentarioService();
    }

    public async getAll(req: Request, res: Response) {
        const comentarios = await ComentarioController.service.getAllComentario();
    
        if (comentarios !== undefined && comentarios!.length !== 0) {
            res.status(200).json(comentarios);
        } else {
            res.status(404).json({ msg: 'Não foram encontradas postagens!' })
        }
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;

        const comentario = await ComentarioController.service.getAllComentarioByIdPost(id);
    
        if (comentario !== undefined && comentario!.length !== 0) {
            res.status(200).json(comentario);
        } else {
            res.status(404).json({ msg: 'A postagem não possui comentários!' })
        }
    }

    public async post(req: Request, res: Response) {
        const comentario: Comentario = req.body;

        await ComentarioController.service.insertComentario(comentario);
    
        res.status(200).json({ msg: 'Comentário concluída!' });
    }

}
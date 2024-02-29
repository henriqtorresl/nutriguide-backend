import { Router } from "express";
import Comentario from "../models/Comentario";
import ComentarioService from "../service/comentarioService";

const routesComentario = Router();

routesComentario.get('/comentario', async (req, res) => {
    const service = new ComentarioService();
    const comentarios = await service.getAllComentario();

    if (comentarios !== undefined && comentarios!.length !== 0) {
        res.status(200).json(comentarios);
    } else {
        res.status(404).json({ msg: 'Não foram encontradas postagens!' })
    }
});

routesComentario.get('/comentario/:id', async (req, res) => {
    const { id } = req.params;

    const service = new ComentarioService();
    const comentario = await service.getAllComentarioByIdPost(id);

    if (comentario !== undefined && comentario!.length !== 0) {
        res.status(200).json(comentario);
    } else {
        res.status(404).json({ msg: 'A postagem não possui comentários!' })
    }
});

routesComentario.post('/comentario', async (req, res) => {
    const comentario: Comentario = req.body;

    const service = new ComentarioService();
    await service.insertComentario(comentario);

    res.status(200).json({ msg: 'Comentário concluída!' });
});

export default routesComentario;
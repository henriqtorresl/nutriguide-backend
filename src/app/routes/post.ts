import { Router } from "express";
import Post from "../models/Post";
import PostService from "../service/postService";

const routesPost = Router();

routesPost.get('/post', async (req, res) => {
    const service = new PostService();
    const posts = await service.getAllPost();

    if (posts !== undefined && posts!.length !== 0) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ msg: 'Não foram encontradas postagens!' })
    }
});

routesPost.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    const service = new PostService();
    const posts = await service.getPostByIdNutricionista(id);

    if (posts !== undefined && posts!.length !== 0) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({ msg: 'Não foram encontradas postagens!' })
    }
});

routesPost.post('/post', async (req, res) => {
    const post: Post = req.body;

    const service = new PostService();
    await service.insertPost(post);

    res.status(200).json({ msg: 'Postagem concluída!' });
});

export default routesPost;
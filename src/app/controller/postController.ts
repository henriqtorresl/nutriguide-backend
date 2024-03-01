import { Request, Response } from "express";
import PostService from "../service/postService";
import Post from "../models/Post";

export default class PostController {

    private static service: PostService;

    constructor() {
        PostController.service = new PostService();
    }

    public async getAll(req: Request, res: Response) {
        const posts = await PostController.service.getAllPost();

        if (posts !== undefined && posts!.length !== 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ msg: 'Não foram encontradas postagens!' })
        }
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params;

        const posts = await PostController.service.getPostByIdNutricionista(id);

        if (posts !== undefined && posts!.length !== 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ msg: 'Não foram encontradas postagens!' })
        }
    }

    public async post(req: Request, res: Response) {
        const post: Post = req.body;

        await PostController.service.insertPost(post);

        res.status(200).json({ msg: 'Postagem concluída!' });
    }

}
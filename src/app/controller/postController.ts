import { Request, Response } from "express";
import PostService from "../service/postService";
import Post from "../models/Post";

export default class PostController {

    private static service: PostService;

    constructor() {
        PostController.service = new PostService();
    }

    public async getAll(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Post Resource']
        #swagger.description = 'Lista todos os posts que ja foram feitos'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const posts = await PostController.service.getAllPost();

        if (posts !== undefined && posts!.length !== 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ msg: 'Não foram encontradas postagens!' })
        }
    }

    public async getOne(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Post Resource']
        #swagger.description = 'Lista todos os posts de um nutricionista a partir de seu id'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']

        */
        
        const { idNutricionista } = req.params;

        const posts = await PostController.service.getPostByIdNutricionista(idNutricionista);

        if (posts !== undefined && posts!.length !== 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ msg: 'Não foram encontradas postagens!' })
        }
    }

    public async post(req: Request, res: Response) {
        /*
        Configurações do Swagger:

        #swagger.tags = ['Post Resource']
        #swagger.description = 'Serviço que permite que um nutricionista crie uma nova postagem'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Postagem',
            required: true,
            schema: {
                conteudo_post: "string",
                data_criacao: "Date",
                id_nutricionista: "number",
                link_iframe: "string"
            }
        }

        */
        
        const post: Post = req.body;

        await PostController.service.insertPost(post);

        res.status(200).json({ msg: 'Postagem concluída!' });
    }

}
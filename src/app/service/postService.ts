import PostRepository from "../database/postRepository";
import Post from "../models/Post";

export default class PostService {

    private repository: PostRepository;

    constructor() {
        this.repository = new PostRepository();
    }

    public async getAllPost() {
        return await this.repository.getAllPost();
    }

    public async getPostByIdNutricionista(idNutricionista: string) {
        return await this.repository.getPostByIdNutricionista(idNutricionista);
    }

    public async insertPost(post: Post) {
        return await this.repository.insertPost(post);
    }

    public async getNutriByIdPost(idPost: string) {
        return await this.repository.getNutriByIdPost(idPost);
    }

}
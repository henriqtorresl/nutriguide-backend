import Post from '../models/Post';
import openDb from './../connection/configDb';
import post from '../resource/SQL/post.json';

export default class PostRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getAllPost(): Promise<Post[] | undefined> {
        try {
            const result = await this.database.all(post.trazerTodos);
            return result;
        } catch (err) {
            console.error('Error getting all posts:', err);
            throw err;
        }
    }

    public async getPostByIdNutricionista(idNutricionista: string): Promise<Post[] | undefined> {
        try {
            const result = await this.database.all(post.trazerPorIdNutricionista, [idNutricionista]);
            return result;
        } catch (err) {
            console.error('Error getting posts by nutritionist ID:', err);
            throw err;
        }
    }

    public async insertPost(postagem: Post): Promise<void> {
        try {
            await this.database.run(
                post.inserir, 
                [postagem.conteudo_post, postagem.data_criacao, postagem.id_nutricionista, postagem.link_iframe]
            );
        } catch (err) {
            console.error('Error inserting post:', err);
            throw err;
        }
    }

    public async getNutriByIdPost(idPost: string): Promise<any | undefined> {
        try {
            const result = await this.database.get(post.trazerNutriPorIdPost, [idPost]);
            return result;
        } catch (err) {
            console.error('Error getting nutritionist by post ID:', err);
            throw err;
        }
    }
}

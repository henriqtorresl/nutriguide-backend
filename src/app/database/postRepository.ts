import Post from '../models/Post';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import post from '../resource/SQL/post.json'

export default class PostRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async getAllPost(): Promise<Post[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Post[]>(
                post.trazerTodos,
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async getPostByIdNutricionista(idNutricionista: string): Promise<Post[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Post[]>(
                post.trazerPorIdNutricionista,
                [idNutricionista],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertPost(postagem: Post): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                post.inserir, 
                [postagem.conteudo_post, postagem.data_criacao, postagem.id_nutricionista, postagem.link_iframe], 
                (err, result) => {
                    if (err) {
                        console.log('erro: ', err);

                        reject(err);

                         
                    } else {
                        resolve(result);

                         
                    }
            });
        });
    }

    public async getNutriByIdPost(idPost: string): Promise<any | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<any>(
                post.trazerNutriPorIdPost,
                [idPost],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

}
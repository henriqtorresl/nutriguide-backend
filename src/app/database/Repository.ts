import urlDb from "../connection/configDb";
import User from "../models/Usuario";
import mysql from 'mysql2';
import usuario from '../resource/SQL/usuario.json'
import nutricionista from '../resource/SQL/nutricionista.json'
import paciente from '../resource/SQL/paciente.json'
import progressoPaciente from "../resource/SQL/progressoPaciente.json"
import alimento from "../resource/SQL/alimento.json"
import avaliacao from "../resource/SQL/avaliacao.json"
import comentario from "../resource/SQL/comentario.json"
import planoAlimentar from "../resource/SQL/planoAlimentar.json"
import post from "../resource/SQL/post.json"
import refeicao from "../resource/SQL/refeicao.json"
import Usuario from "../models/Usuario";
import UsuarioPaciente from "../models/UsuarioPaciente";
import UsuarioNutricionista from "../models/UsuarioNutricionista";
import ProgressoPaciente from "../models/ProgressoPaciente";
import Refeicao from "../models/Refeicao";
import Alimento from "../models/Alimento";
import PlanoAlimentar from "../models/PlanoAlimentar";
import AlimentoPlanoAlimentar from "../models/AlimentoPlanoAlimentar";
import Avaliacao from "../models/Avaliacao";
import Post from "../models/Post";
import UsuarioComentario from "../models/UsuarioComentario";
import Comentario from "../models/Comentario";

export default class Repository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public findUserByName(nome: string): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<User[]>(usuario.findByName, [nome], (err, result) => {
                if (err) {
                    reject(err);

                    this.database.end();
                } else {
                    resolve(result?.[0]);

                    this.database.end();
                }
            });
        });
    }

    public findById(id: string): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<User[]>(usuario.findById, [id], (err, result) => {
                if (err) {
                    reject(err);

                    this.database.end();
                } else {
                    resolve(result?.[0]);

                    this.database.end();
                }
            });
        });
    }

    public insertUserPaciente(user: Usuario): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<User[]>(
                usuario.inserirPaciente, 
                [user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario, user.tipo_usuario], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public trazUltimoIdInserido(): Promise<Usuario | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Usuario[]>(
                usuario.trazUltimoIdInserido,  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public insertPaciente(userPaciente: UsuarioPaciente, idUsuario: number): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.inserir, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idUsuario, userPaciente.nutricionista_responsavel], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);

                        this.database.end();
                    }
            });
        });
    }

    public editPaciente(userPaciente: UsuarioPaciente, idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.atualizar, 
                [userPaciente.peso, userPaciente.altura, userPaciente.queixa, userPaciente.comorbidades, userPaciente.medicacoes, idPaciente], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);

                        this.database.end();
                    }
            });
        });
    }

    getAllPacientesByNutriName(responsavel: string): Promise<UsuarioPaciente[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerTodos,
                [responsavel],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getOnePaciente(idPaciente: string): Promise<UsuarioPaciente | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioPaciente[]>(
                paciente.trazerPorId,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getAllNutricionistas(): Promise<UsuarioNutricionista[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerTodos,  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getOneNutricionista(idNutricionista: string): Promise<UsuarioNutricionista | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerPorId,
                [idNutricionista],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getOneNutricionistaByNomeUser(nome: string): Promise<UsuarioNutricionista | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerPorNomeUsuario,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string): Promise<UsuarioNutricionista[] | undefined> {
        let query: string = nutricionista.trazerFiltrados;

        if (nome !== '') {
            query += ` AND nome_usuario LIKE '%` + nome + `%'`;
        } else if (especialidade !== '') {
            query += ` AND especialidade LIKE '%` + especialidade + `%'`;
        } else if (regiao !== '') {
            query += ` AND regiao LIKE '%` + regiao + `%'`;
        }

        query += ' ORDER BY id_nutricionista DESC';

        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                query,  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getOnePacienteByNomeUser(nome: string): Promise<UsuarioNutricionista | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                paciente.trazerPorNomeUsuario,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getProgressoByIdPaciente(idPaciente: string): Promise<ProgressoPaciente[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<ProgressoPaciente[]>(
                progressoPaciente.trazerPorIdPaciente,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertProgressoPaciente(progresso: ProgressoPaciente): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query<User[]>(
                progressoPaciente.inserir, 
                [progresso.id_paciente, progresso.data, progresso.peso, progresso.habitos_alimentares, progresso.medidas_corporais, progresso.queixa, progresso.nivel_atividade_fisica, progresso.suplementacao_atual], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);

                        this.database.end();
                    }
            });
        });
    }

    public async getAllRefeicoes(): Promise<Refeicao[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Refeicao[]>(
                refeicao.trazerTodas, 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertAlimento(alimen: Alimento): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                alimento.inserir, 
                [alimen.id_alimento, alimen.id_plano, alimen.id_refeicao, alimen.nome_alimento, alimen.quantidade_grama, alimen.qnt_carboidrato, alimen.qnt_proteina, alimen.qnt_gordura], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

    public async insertPlanoAlimentar(plano: PlanoAlimentar): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                planoAlimentar.inserir, 
                [plano.id_paciente, plano.nome_plano], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

    getAlimentasByIdPaciente(idPaciente: string): Promise<AlimentoPlanoAlimentar[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<AlimentoPlanoAlimentar[]>(
                alimento.trazerPlanoPorIdPaciente,
                [idPaciente],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getPlanoAlimentarByName(nome: string): Promise<PlanoAlimentar | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<PlanoAlimentar[]>(
                planoAlimentar.trazerPorNome,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getAvaliacoesById(idNutricionista: string): Promise<Avaliacao[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Avaliacao[]>(
                avaliacao.trazerPorIdNutricionista,
                [idNutricionista],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertAvaliacao(aval: Avaliacao): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                avaliacao.inserir, 
                [aval.avaliacao, aval.nota_nutricionista, aval.id_nutricionista], 
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

    getAllPost(): Promise<Post[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Post[]>(
                post.trazerTodos,
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getPostByIdNutricionista(idNutricionista: string): Promise<Post[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Post[]>(
                post.trazerPorIdNutricionista,
                [idNutricionista],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
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

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

    getNutriByIdPost(idPost: string): Promise<any | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<any>(
                post.trazerNutriPorIdPost,
                [idPost],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    getAllComentario(): Promise<UsuarioComentario[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioComentario[]>(
                comentario.trazerTodosComentarios,
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    getAllComentarioByIdPost(idPost: string): Promise<Post[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Post[]>(
                comentario.trazerTodosComentariosByIdPost,
                [idPost],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async insertComentario(coment: Comentario): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                comentario.inserir, 
                [coment.data_criacao, coment.conteudo, coment.id_post, coment.id_usuario], 
                (err, result) => {
                    if (err) {
                        console.log('erro: ', err);

                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result);

                        this.database.end();
                    }
            });
        });
    }

}
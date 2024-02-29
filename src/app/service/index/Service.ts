import { Transporter } from "nodemailer";
import Repository from "../../database/index/Repository";
import Alimento from "../../models/Alimento";
import Avaliacao from "../../models/Avaliacao";
import Comentario from "../../models/Comentario";
import PlanoAlimentar from "../../models/PlanoAlimentar";
import Post from "../../models/Post";
import ProgressoPaciente from "../../models/ProgressoPaciente";
import Usuario from "../../models/Usuario";
import UsuarioPaciente from "../../models/UsuarioPaciente";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class Service {

    repository!: Repository;

    constructor() {
        this.repository = new Repository();
    }

    // OK
    public async findUserByName(nome: string): Promise<Usuario | undefined> {
        return await this.repository.findUserByName(nome);
    }

    // OK
    public async findById(id: string): Promise<Usuario | undefined> {
        return await this.repository.findById(id);
    }

    // OK
    public async insertPaciente(paciente: UsuarioPaciente) {
        await this.repository.insertUserPaciente(paciente);
        const retorno: Usuario | undefined = await this.repository.trazUltimoIdInserido();

        await this.repository.insertPaciente(paciente, retorno!.id_usuario);
    }

    // OK
    public async editPaciente(paciente: UsuarioPaciente, idPaciente: string) {
        await this.repository.editPaciente(paciente, idPaciente);
    }

    // OK
    public async getAllPacientesByNutriName(responsavel: string) {
        return await this.repository.getAllPacientesByNutriName(responsavel);
    }

    // OK
    public async getOnePaciente(idPaciente: string) {
        return await this.repository.getOnePaciente(idPaciente);
    }

    // OK
    public async getAllNutricionistas() {
        return await this.repository.getAllNutricionistas();
    }

    // OK
    public async getOneNutricionista(idNutricionista: string) {
        return await this.repository.getOneNutricionista(idNutricionista);
    }

    // OK
    public async getOneNutricionistaByNomeUser(nome: string) {
        return await this.repository.getOneNutricionistaByNomeUser(nome);
    }

    // OK
    public async getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string) {
        return await this.repository.getAllNutricionistasFiltered(nome, especialidade, regiao);
    }

    // OK
    public async getOnePacienteByNomeUser(nome: string) {
        return await this.repository.getOnePacienteByNomeUser(nome);
    }

    // OK
    public async getProgressoByIdPaciente(idPaciente: string) {
        return await this.repository.getProgressoByIdPaciente(idPaciente);
    }

    // OK
    public async insertProgressoPaciente(progresso: ProgressoPaciente) {
        return await this.repository.insertProgressoPaciente(progresso);
    }

    // OK
    public async getAllRefeicoes() {
        return await this.repository.getAllRefeicoes();
    }

    // OK
    public async insertAlimento(alimento: Alimento) {
        await this.repository.insertAlimento(alimento);
    }

    // OK
    public async insertPlanoAlimentar(plano: PlanoAlimentar) {
        await this.repository.insertPlanoAlimentar(plano);
    }

    // OK
    public async getAlimentasByIdPaciente(idPaciente: string) {
        return await this.repository.getAlimentasByIdPaciente(idPaciente);
    }

    // OK
    public async getPlanoAlimentarByName(nome: string) {
        return await this.repository.getPlanoAlimentarByName(nome);
    }

    // OK
    public async getAvaliacoesById(idNutricionista: string) {
        return await this.repository.getAvaliacoesById(idNutricionista);
    }

    // OK
    public async insertAvaliacao(avaliacao: Avaliacao) {
        return await this.repository.insertAvaliacao(avaliacao);
    }

    // OK
    public async getAllPost() {
        return await this.repository.getAllPost();
    }

    // OK
    public async getPostByIdNutricionista(idNutricionista: string) {
        return await this.repository.getPostByIdNutricionista(idNutricionista);
    }

    // OK
    public async insertPost(post: Post) {
        return await this.repository.insertPost(post);
    }

    // OK
    public async getNutriByIdPost(idPost: string) {
        return await this.repository.getNutriByIdPost(idPost);
    }

    // OK
    public async getAllComentario() {
        return await this.repository.getAllComentario();
    }

    // OK
    public async getAllComentarioByIdPost(idPost: string) {
        return await this.repository.getAllComentarioByIdPost(idPost);
    }

    // OK
    public async insertComentario(comentario: Comentario) {
        return await this.repository.insertComentario(comentario);
    }

    // OK
    public async enviarEmail(
        transporter: Transporter<SMTPTransport.SentMessageInfo>,
        title: string,
        html: string,
        nomeQuemEnviou: string,
        emailReceptor: string | string[],
        emailReplyTo?: string
    ) {
        const mailSend = await transporter.sendMail({
            subject: title,
            html: html,
            from: nomeQuemEnviou,
            to: emailReceptor,
            replyTo: emailReplyTo
        });
    }

}
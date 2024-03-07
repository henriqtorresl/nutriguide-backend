import e from "cors";
import UsuarioRepository from "../database/usuarioRepository";
import Usuario from "../models/Usuario";

export default class UsuarioService {

    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    public async findUserByName(nome: string): Promise<Usuario | undefined> {
        return await this.repository.findUserByName(nome);
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        return await this.repository.findById(id);
    }

    public async emailsCadastrados(): Promise<string[]> {
        const emailObjects: any[] | undefined = await this.repository.emailsCadastrados();

        return emailObjects!.map(
            (e) => e.email
        );
    }

}
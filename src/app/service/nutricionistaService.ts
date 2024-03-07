import NutricionistaRepository from "../database/nutricionistaRepository";
import UsuarioRepository from "../database/usuarioRepository";
import Usuario from "../models/Usuario";
import UsuarioNutricionista from "../models/UsuarioNutricionista";

export default class NutricionistaService {

    private repository: NutricionistaRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.repository = new NutricionistaRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    public async getAllNutricionistas() {
        return await this.repository.getAllNutricionistas();
    }

    public async getOneNutricionista(idNutricionista: string) {
        return await this.repository.getOneNutricionista(idNutricionista);
    }

    public async getOneNutricionistaByNomeUser(nome: string) {
        return await this.repository.getOneNutricionistaByNomeUser(nome);
    }

    public async getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string) {
        return await this.repository.getAllNutricionistasFiltered(nome, especialidade, regiao);
    }

    public async insertNutricionista(nutricionista: UsuarioNutricionista) {
        await this.usuarioRepository.insertUserNutricionista(nutricionista);
        const retorno: Usuario | undefined = await this.usuarioRepository.trazUltimoIdInserido();

        await this.repository.insertNutricionista(nutricionista, retorno!.id_usuario);
    }

}
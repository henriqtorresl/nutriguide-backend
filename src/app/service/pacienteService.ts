import PacienteRepository from "../database/pacienteRepository";
import UsuarioRepository from "../database/usuarioRepository";
import Usuario from "../models/Usuario";
import UsuarioPaciente from "../models/UsuarioPaciente";

export default class PacienteService {

    private repository: PacienteRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.repository = new PacienteRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    public async insertPaciente(paciente: UsuarioPaciente) {
        await this.usuarioRepository.insertUserPaciente(paciente);
        const retorno: Usuario | undefined = await this.usuarioRepository.trazUltimoIdInserido();

        await this.repository.insertPaciente(paciente, retorno!.id_usuario);
    }

    public async editPaciente(paciente: UsuarioPaciente, idPaciente: string) {
        await this.repository.editPaciente(paciente, idPaciente);
    }

    public async getAllPacientesByNutriName(responsavel: string) {
        return await this.repository.getAllPacientesByNutriName(responsavel);
    }

    public async getOnePaciente(idPaciente: string) {
        return await this.repository.getOnePaciente(idPaciente);
    }

    public async getOnePacienteByNomeUser(nome: string) {
        return await this.repository.getOnePacienteByNomeUser(nome);
    }

}
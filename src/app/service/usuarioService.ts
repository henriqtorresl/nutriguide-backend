import UsuarioRepository from "../database/usuarioRepository";

export default class UsuarioService {

    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

}
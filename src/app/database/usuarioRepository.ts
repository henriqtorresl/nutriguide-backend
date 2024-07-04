import Usuario from '../models/Usuario';
import openDb from './../connection/configDb';
import usuario from '../resource/SQL/usuario.json';

export default class UsuarioRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async findUserByName(nome: string): Promise<Usuario | undefined> {
        try {
            const result = await this.database.get(usuario.findByName, nome);
            return result;
        } catch (err) {
            console.error('Error finding user by name:', err);
            throw err;
        }
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        try {
            const result = await this.database.get(usuario.findById, id);
            return result;
        } catch (err) {
            console.error('Error finding user by ID:', err);
            throw err;
        }
    }

    public async insertUserPaciente(user: Usuario): Promise<Usuario | undefined> {
        try {
            const result = await this.database.run(
                usuario.inserirPaciente,
                user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario, user.tipo_usuario
            );
            const lastID = result.lastID;
            return this.findById(lastID.toString());
        } catch (err) {
            console.error('Error inserting paciente:', err);
            throw err;
        }
    }

    public async insertUserNutricionista(user: Usuario): Promise<Usuario | undefined> {
        try {
            const result = await this.database.run(
                usuario.inserirNutricionista,
                user.cpf, user.email, user.sexo, user.telefone, user.cep, user.data_nascimento, user.nome_usuario
            );
            const lastID = result.lastID;
            return this.findById(lastID.toString());
        } catch (err) {
            console.error('Error inserting nutricionista:', err);
            throw err;
        }
    }

    public async trazUltimoIdInserido(): Promise<Usuario | undefined> {
        try {
            const result = await this.database.get(usuario.trazUltimoIdInserido);
            return result;
        } catch (err) {
            console.error('Error fetching last inserted ID:', err);
            throw err;
        }
    }

    public async emailsCadastrados(): Promise<any[] | undefined> {
        try {
            const result = await this.database.all(usuario.trazEmailsCadastrados);
            return result;
        } catch (err) {
            console.error('Error fetching registered emails:', err);
            throw err;
        }
    }

}

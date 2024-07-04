import UsuarioNutricionista from '../models/UsuarioNutricionista';
import openDb from './../connection/configDb';
import nutricionista from '../resource/SQL/nutricionista.json';

export default class NutricionistaRepository {

    public database: any;

    constructor() {
        this.initializeDb();
    }

    private async initializeDb() {
        this.database = await openDb();
    }

    public async getAllNutricionistas(): Promise<UsuarioNutricionista[] | undefined> {
        try {
            const result = await this.database.all(nutricionista.trazerTodos);
            return result;
        } catch (err) {
            console.error('Error getting all nutritionists:', err);
            throw err;
        }
    }

    public async getOneNutricionista(idNutricionista: string): Promise<UsuarioNutricionista | undefined> {
        try {
            const result = await this.database.get(nutricionista.trazerPorId, [idNutricionista]);
            return result;
        } catch (err) {
            console.error('Error getting nutritionist by ID:', err);
            throw err;
        }
    }

    public async getOneNutricionistaByNomeUser(nome: string): Promise<UsuarioNutricionista | undefined> {
        try {
            const result = await this.database.get(nutricionista.trazerPorNomeUsuario, [nome]);
            return result;
        } catch (err) {
            console.error('Error getting nutritionist by username:', err);
            throw err;
        }
    }

    public async getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string): Promise<UsuarioNutricionista[] | undefined> {
        let query: string = nutricionista.trazerFiltrados;

        if (nome !== '') {
            query += ` AND nome_usuario LIKE '%${nome}%'`;
        }
        if (especialidade !== '') {
            query += ` AND especialidade LIKE '%${especialidade}%'`;
        }
        if (regiao !== '') {
            query += ` AND regiao LIKE '%${regiao}%'`;
        }

        query += ' ORDER BY id_nutricionista DESC';

        try {
            const result = await this.database.all(query);
            return result;
        } catch (err) {
            console.error('Error getting filtered nutritionists:', err);
            throw err;
        }
    }

    public async insertNutricionista(userNutricionista: UsuarioNutricionista, idUsuario: number): Promise<void> {
        try {
            await this.database.run(
                nutricionista.inserir, 
                [userNutricionista.regiao, userNutricionista.faculdade, userNutricionista.especialidade, userNutricionista.redesocial, idUsuario]
            );
        } catch (err) {
            console.error('Error inserting nutritionist:', err);
            throw err;
        }
    }
}

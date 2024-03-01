import UsuarioNutricionista from '../models/UsuarioNutricionista';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import nutricionista from '../resource/SQL/nutricionista.json'

export default class NutricionistaRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async getAllNutricionistas(): Promise<UsuarioNutricionista[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerTodos,  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result);
                    }
            });
        });
    }

    public async getOneNutricionista(idNutricionista: string): Promise<UsuarioNutricionista | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerPorId,
                [idNutricionista],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async getOneNutricionistaByNomeUser(nome: string): Promise<UsuarioNutricionista | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<UsuarioNutricionista[]>(
                nutricionista.trazerPorNomeUsuario,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

    public async getAllNutricionistasFiltered(nome: string, especialidade: string, regiao: string): Promise<UsuarioNutricionista[] | undefined> {
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

                         
                    } else {
                        resolve(result);
                    }
            });
        });
    }

}
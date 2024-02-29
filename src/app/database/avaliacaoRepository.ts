import Avaliacao from '../models/Avaliacao';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import avaliacao from '../resource/SQL/avaliacao.json'

export default class AvaliacaoRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async getAvaliacoesById(idNutricionista: string): Promise<Avaliacao[] | undefined> {
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

}
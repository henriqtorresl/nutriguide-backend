import Refeicao from '../models/Refeicao';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import refeicao from '../resource/SQL/refeicao.json'

export default class RefeicaoRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async getAllRefeicoes(): Promise<Refeicao[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<Refeicao[]>(
                refeicao.trazerTodas, 
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
import PlanoAlimentar from '../models/PlanoAlimentar';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import planoAlimentar from '../resource/SQL/planoAlimentar.json'

export default class PlanoAlimentarRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async insertPlanoAlimentar(plano: PlanoAlimentar): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                planoAlimentar.inserir, 
                [plano.id_paciente, plano.nome_plano], 
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

    public async getPlanoAlimentarByName(nome: string): Promise<PlanoAlimentar | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<PlanoAlimentar[]>(
                planoAlimentar.trazerPorNome,
                [nome],  
                (err, result) => {
                    if (err) {
                        reject(err);

                        this.database.end();
                    } else {
                        resolve(result?.[0]);
                    }
            });
        });
    }

}
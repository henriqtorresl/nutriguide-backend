import Alimento from '../models/Alimento';
import urlDb from './../connection/configDb';
import mysql from 'mysql2';
import alimento from '../resource/SQL/alimento.json'
import AlimentoPlanoAlimentar from '../models/AlimentoPlanoAlimentar';

export default class AlimentoRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

    public async insertAlimento(alimen: Alimento): Promise<void> {
        await new Promise((resolve, reject) => {
            this.database.query(
                alimento.inserir, 
                [alimen.id_alimento, alimen.id_plano, alimen.id_refeicao, alimen.nome_alimento, alimen.quantidade_grama, alimen.qnt_carboidrato, alimen.qnt_proteina, alimen.qnt_gordura], 
                (err, result) => {
                    if (err) {
                        reject(err);

                         
                    } else {
                        resolve(result);

                         
                    }
            });
        });
    }

    public async getAlimentasByIdPaciente(idPaciente: string): Promise<AlimentoPlanoAlimentar[] | undefined> {
        return new Promise((resolve, reject) => {
            this.database.query<AlimentoPlanoAlimentar[]>(
                alimento.trazerPlanoPorIdPaciente,
                [idPaciente],  
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
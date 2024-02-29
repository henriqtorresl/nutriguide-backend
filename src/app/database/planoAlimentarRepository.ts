import urlDb from './../connection/configDb';
import mysql from 'mysql2';

export default class PlanoAlimentarRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

}
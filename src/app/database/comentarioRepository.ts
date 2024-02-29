import urlDb from './../connection/configDb';
import mysql from 'mysql2';

export default class ComentarioRepository {

    public database;

    constructor() {
        this.database = mysql.createPool(urlDb);
    }

}
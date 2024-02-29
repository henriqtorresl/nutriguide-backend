import { RowDataPacket } from "mysql2";

export default interface Nutricionista extends RowDataPacket {
    id_nutricionista: number;
    regiao: string;
    faculdade: string;
    especialidade: string;
    redesocial: string;
    id_usuario: number;
    nomefoto?: string;
    dadofoto?: string;
}
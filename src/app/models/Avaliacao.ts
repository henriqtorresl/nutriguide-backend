import { RowDataPacket } from "mysql2";

export default interface Avaliacao extends RowDataPacket {
    id_avaliacao: number,
    avaliacao: string,
    nota_nutricionista: number,     // de um a 5
    id_nutricionista: number
}
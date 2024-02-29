import { RowDataPacket } from "mysql2";

export default interface Refeicao extends RowDataPacket {
    id_refeicao: number,
    nome_refeicao: string
}
import { RowDataPacket } from "mysql2";

export default interface Comentario extends RowDataPacket {
    id_comentario: number,
    data_criacao: Date,
    conteudo: string,
    id_post: number,
    id_usuario: number
}
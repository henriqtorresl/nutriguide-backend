import { RowDataPacket } from "mysql2";

export default interface Post extends RowDataPacket {
    id_post: number,
    conteudo_post: string,
    data_criacao: Date,
    id_nutricionista: number,
    link_iframe: string
}
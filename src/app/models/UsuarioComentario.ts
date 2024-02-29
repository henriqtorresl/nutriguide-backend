import { RowDataPacket } from "mysql2";

export default interface Usuario extends RowDataPacket {
    id_usuario: number;
    cpf: number;
    nome_usuario: string;
    email: string;
    sexo: string;       // ENUM: ou 'M' ou 'F'
    telefone: string;
    cep: string;
    data_nascimento: Date;
    tipo_usuario: string;
    id_comentario: number;
    data_criacao: Date;
    conteudo: string;
    id_post: number
}
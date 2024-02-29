import { RowDataPacket } from "mysql2";

export default interface UsuarioNutricionista extends RowDataPacket {
    id_usuario: number;
    cpf: number;
    nome_usuario: string;
    email: string;
    sexo: string;       // ENUM: ou 'M' ou 'F'
    telefone: string;
    cep: string;
    data_nascimento: Date;
    tipo_usuario: string;
    id_nutricionista: number;
    regiao: string;
    faculdade: string;
    especialidade: string;
    redesocial: string;
    nomefoto?: string;
    dadofoto?: string;
}
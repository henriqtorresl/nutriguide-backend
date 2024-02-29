import { RowDataPacket } from "mysql2";

export default interface Paciente extends RowDataPacket {
    id_paciente: number;
    id_usuario: number;
    peso: number;
    altura: number;
    queixa: string;
    comorbidades: string;
    medicacoes: string;
    nutricionista_responsavel: string;
    nome_foto?: string;
    dado_foto?: string
}
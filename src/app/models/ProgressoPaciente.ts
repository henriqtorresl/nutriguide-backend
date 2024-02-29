import { RowDataPacket } from "mysql2";

export default interface ProgressoPaciente extends RowDataPacket {
    id_progesso: number;
    id_paciente: number;
    data: Date,
    peso: number,
    habitos_alimentares: string,
    medidas_corporais: string,
    queixa: string,
    nivel_atividade_fisica: string,
    suplementacao_atual: string,
}
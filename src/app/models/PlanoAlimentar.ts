import { RowDataPacket } from "mysql2";

export default interface PlanoAlimentar extends RowDataPacket {
    id_plano: number,	
    id_paciente: number,
    nome_plano: string
}
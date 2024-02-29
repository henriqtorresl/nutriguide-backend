import { RowDataPacket } from "mysql2";

export default interface Alimento extends RowDataPacket {
    id_alimento: number,	
    id_plano: number,	
    id_refeicao: number,	
    nome_alimento: string,	
    quantidade_grama: number,
    qnt_carboidrato: number,	
    qnt_proteina: number,
    qnt_gordura: number
}
export default interface AlimentoPlanoAlimentar {
    id_alimento: number,	
    id_plano: number,	
    id_refeicao: number,
    nome_refeicao: string,	
    nome_alimento: string,	
    quantidade_grama: number,
    qnt_carboidrato: number,	
    qnt_proteina: number,
    qnt_gordura: number,
    id_paciente: number,
    nome_plano: string
}
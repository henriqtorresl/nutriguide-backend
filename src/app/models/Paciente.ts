export default interface Paciente {
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
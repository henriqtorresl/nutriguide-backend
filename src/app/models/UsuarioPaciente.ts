export default interface UsuarioPaciente {
    id_usuario: number;
    cpf: number;
    nome_usuario: string;
    email: string;
    sexo: string;       // ENUM: ou 'M' ou 'F'
    telefone: string;
    cep: string;
    data_nascimento: Date;
    tipo_usuario: string;
    id_paciente: number;
    peso: number;
    altura: number;
    queixa: string;
    comorbidades: string;
    medicacoes: string;
    nutricionista_responsavel: string;
    nome_foto?: string;
    dado_foto?: string
}
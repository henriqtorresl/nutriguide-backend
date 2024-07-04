CREATE TABLE tb_usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    sexo TEXT,
    telefone TEXT,
    cep TEXT,
    data_nascimento DATE,
    nome_usuario TEXT NOT NULL,
    tipo_usuario TEXT
);

CREATE TABLE tb_nutricionista (
    id_nutricionista INTEGER PRIMARY KEY AUTOINCREMENT,
    regiao TEXT,
    faculdade TEXT,
    especialidade TEXT,
    redesocial TEXT,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

CREATE TABLE tb_paciente (
    id_paciente INTEGER PRIMARY KEY AUTOINCREMENT,
    peso REAL,
    altura REAL,
    queixa TEXT,
    comorbidades TEXT,
    medicacoes TEXT,
    id_usuario INTEGER,
    nutricionista_responsavel INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario),
    FOREIGN KEY (nutricionista_responsavel) REFERENCES tb_nutricionista(id_nutricionista)
);

CREATE TABLE tb_plano_alimentar (
    id_plano INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER,
    nome_plano TEXT,
    FOREIGN KEY (id_paciente) REFERENCES tb_paciente(id_paciente)
);

CREATE TABLE tb_refeicao (
    id_refeicao INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_refeicao TEXT
);

CREATE TABLE tb_alimento (
    id_alimento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_plano INTEGER,
    id_refeicao INTEGER,
    nome_alimento TEXT,
    quantidade_grama INTEGER,
    qnt_carboidrato REAL,
    qnt_proteina REAL,
    qnt_gordura REAL,
    FOREIGN KEY (id_plano) REFERENCES tb_plano_alimentar(id_plano),
    FOREIGN KEY (id_refeicao) REFERENCES tb_refeicao(id_refeicao)
);

CREATE TABLE tb_avaliacao (
    id_avaliacao INTEGER PRIMARY KEY AUTOINCREMENT,
    avaliacao TEXT,
    nota_nutricionista INTEGER,
    id_nutricionista INTEGER,
    FOREIGN KEY (id_nutricionista) REFERENCES tb_nutricionista(id_nutricionista)
);

CREATE TABLE tb_post (
    id_post INTEGER PRIMARY KEY AUTOINCREMENT,
    conteudo_post TEXT,
    data_criacao TIMESTAMP,
    id_nutricionista INTEGER,
    link_iframe TEXT,
    FOREIGN KEY (id_nutricionista) REFERENCES tb_nutricionista(id_nutricionista)
);

CREATE TABLE tb_comentario (
    id_comentario INTEGER PRIMARY KEY AUTOINCREMENT,
    data_criacao TIMESTAMP,
    conteudo TEXT,
    id_post INTEGER,
    id_usuario INTEGER,
    FOREIGN KEY (id_post) REFERENCES tb_post(id_post),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

CREATE TABLE tb_progresso_paciente (
    id_progresso INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER,
    data DATE,
    peso REAL,
    habitos_alimentares TEXT,
    medidas_corporais TEXT,
    queixa TEXT,
    nivel_atividade_fisica TEXT,
    suplementacao_atual TEXT,
    FOREIGN KEY (id_paciente) REFERENCES tb_paciente(id_paciente)
);

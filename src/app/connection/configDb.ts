import dotenv from 'dotenv';

// arquivo com as configurações de conexao do banco

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

const urlDb: string = String(process.env.DATABASE_URL);     // trazendo a DATABASE_URL do arquivo .env e convertendo para string

export default urlDb;
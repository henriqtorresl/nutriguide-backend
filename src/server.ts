import express from 'express';
import cors from 'cors';
import routes from './app/routes/index/routes';

const app = express();

// Configurações da API
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3000, () => {
    console.log('Rodando em "http://localhost:3000"');
});
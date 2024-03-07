import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Nutriguide API',
        description: 'Documentação dos endpoints do backend do projeto Nutriguide'
    },
    host: 'https://nutriguide-api.vercel.app'
};

const outputFile = './src/documentation/swagger.json';
const endpoints = [
    '../app/routes/alimento.ts',
    '../app/routes/auth.ts',
    '../app/routes/avaliacao.ts',
    '../app/routes/comentario.ts',
    '../app/routes/email.ts',
    '../app/routes/nutricionista.ts',
    '../app/routes/paciente.ts',
    '../app/routes/planoAlimentar.ts',
    '../app/routes/post.ts',
    '../app/routes/progressoPaciente.ts',
    '../app/routes/refeicao.ts'
];

swaggerAutogen(outputFile, endpoints, doc);
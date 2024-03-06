import express from 'express';
import cors from 'cors';
import routes from './app/routes/index/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './documentation/swagger.json'

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3000, () => {
    console.log('Rodando em "http://localhost:3000"');
});


const CSS_URL = " https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css ";

swaggerUi.setup({ customCssUrl: CSS_URL })

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
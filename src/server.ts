import express from 'express';
import cors from 'cors';
import routes from './app/routes/index/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './documentation/swagger.json'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(routes);

const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs, 
    {
        customCss:
          `
            .swagger-ui .opblock .opblock-summary-path-description-wrapper { 
                align-items: center; 
                display: flex; 
                flex-wrap: wrap; 
                gap: 0 10px; 
                padding: 0 10px; 
                width: 100%; 
            }
            .opblock-control-arrow {
                border: none !important;
                background: none !important;
            }
            .schemes-server-container {
                select {
                    text-transform: uppercase !important; 
                    margin-left: 15px;
                    cursor: pointer;
                }
            }
          `,
        customCssUrl: CSS_URL,
    }    
));

app.listen(port, () => {
    console.log(`Rodando em "http://localhost:${port}"`);
});
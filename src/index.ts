import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/data-source';
import { errors } from 'celebrate';
import router from './app/routes/routes';
import cors from 'cors';
import authApiKey from './shared/middleware/authApiKey';
import genericError from './shared/middleware/genericError';

const app = express();
const port = process.env.PORT || 3000;

// Configuração dos middlewares
app.use(cors());
app.use(express.json());
app.use('/tmp/uploads', express.static('tmp/uploads'));
app.use(authApiKey); // Middleware de autenticação de chave de API

// Configuração das rotas
app.use('/api', router);

// Middleware de tratamento de erros do celebrate (Joi)
app.use(errors());

// Handler de erro genérico
app.use(genericError);


// Inicialização do servidor após conexão com o banco de dados
AppDataSource.initialize().then(() => { 
  console.log('Database connected');
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
});

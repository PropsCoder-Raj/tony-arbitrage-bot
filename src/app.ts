import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

require('dotenv').config();

const swaggerFile: any = (process.cwd()+"/src/swagger/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const customCss: any = fs.readFileSync((process.cwd()+"/src/swagger/swagger.scss"), 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, undefined, undefined, customCss));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

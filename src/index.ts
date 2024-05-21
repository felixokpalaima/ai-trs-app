import path from 'path';
import express, { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

import recommendationRouter from './routes';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.simple()
    })
  ]
});

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request on ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  logger.debug('Handling GET request for /');
  res.render('index', { recommendations: [] });
});

app.use(recommendationRouter);

app.all('*', (_req: Request, res: Response) => {
  return res.status(404).send({ message: 'Route not supported.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  logger.info(`Server is running on http://localhost:${PORT}`);
});

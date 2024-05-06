import path from 'path';
import express, { Request, Response } from 'express';
import recommendationRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());


app.get('/', (_req, res) => {
  res.render('index', { recommendations: [] });
});

app.use(recommendationRouter);

app.all('*', (_req: Request, res: Response) => {
  return res.status(404).send({ message: 'Route not supported.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

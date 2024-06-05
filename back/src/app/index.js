import express from 'express';
import cors from './middlewares/cors.js';
import routes from './routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors);
app.use(routes);

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`),
);

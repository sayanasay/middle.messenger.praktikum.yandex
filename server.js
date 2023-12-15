/* eslint-disable */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(`${__dirname}/dist/`));

app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

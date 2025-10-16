import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import routers from './routers/router.js';
import mongoose from './db/mongoose.js';
import cors from 'cors';
import connectDB from './db/mongoose.js';
import { fileURLToPath } from 'url';
import path from 'path';


const filePath = fileURLToPath(import.meta.url);
const folderPath = path.dirname(filePath)

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routers);

app.use(express.static(path.join(folderPath, '../../client/build')));

app.get('*', function (req, res) {
	res.sendFile(path.join(folderPath, '../../client/build', 'index.html'));
});

export default app;

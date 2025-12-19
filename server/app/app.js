import express from 'express';
const app = express();
// import bodyParser from 'body-parser';
import routers from './routers/router.js';
import mongoose from './db/mongoose.js';
import cors from 'cors';
import connectDB from './db/mongoose.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';

const filePath = fileURLToPath(import.meta.url);
const folderPath = path.dirname(filePath);

connectDB();

const origins = ['http://localhost:5173', '74.220.51.0/24', '74.220.59.0/24'];

app.use(
	cors({
		origin: origins,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use('/', routers);

// app.use(express.static(path.join(folderPath, '../../client/build')));

// app.get('*', function (req, res) {
// 	res.sendFile(path.join(folderPath, '../../client/build', 'index.html'));
// });

export default app;

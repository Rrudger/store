import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import storageRouter from './routes/storage.js';
import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const whitelist = ["http://localhost:3000", "http://localhost:5001"];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

const pathway = path.join(__dirname, 'public');
app.use('/public', express.static(pathway));

app.use(cors(corsOptions));

app.use('/storage', storageRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);


app.listen(5001);

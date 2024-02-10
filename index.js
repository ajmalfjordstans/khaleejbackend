import express from "express"
import bodyParser from "body-parser";
import cors from 'cors'
import { PORT } from "./config.js";
import dotenv from 'dotenv';
import routes from './routes/index.js'

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://khaleejmandi.co.uk', 'https://www.khaleejmandi.co.uk', 'https://khaleej.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'],
    optionsSuccessStatus: 204,
  })
)
app.use(routes)

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
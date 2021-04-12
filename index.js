import express from "express";
import Routes from './src/routes'
import './src/database';
import cors from 'cors';

const app = express()

app.use(express.json());
app.use(cors());

app.use(Routes)

app.listen(process.env.PORT || 5000);
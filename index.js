import express from "express";
import Routes from './src/routes'
import './src/database';

const app = express()

app.use(express.json());
app.use('/api/v1/', Routes)

app.listen(process.env.PORT || 5000);
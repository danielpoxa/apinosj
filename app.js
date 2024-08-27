// app.js

const express = require('express');
const userRoutes = require('./routes/userRoute');
const cors = require('cors');

const app = express();

// Middleware para interpretar o JSON no corpo das requisições
app.use(express.json());
app.use(cors());

// Rotas da API
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

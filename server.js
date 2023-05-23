const express = require('express');
const dotenv = require('dotenv');
const { saveData } = require('./database');
const { validateData } = require('./validation');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/health', (req, res) => {
    res.send('Server is running');
});

// Endpoint para receber o webhook
app.post('/webhook', (req, res) => {
    console.log(req.body);
    // Verifique se os dados estão corretos
    if (validateData(req.body)) {
        // Atualize o status do pedido no banco de dados
        saveData(req.body);

        // Envie uma resposta
        res.sendStatus(200).send('Webhook received!');
    } else {
        res.sendStatus(400).send('Bad request!');
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// O serviço que iniciou o pagamento, o app, deve ficar verificando de tempos em tempos se o pagamento foi concluído.
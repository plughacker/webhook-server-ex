const express = require('express');
const dotenv = require('dotenv');
const { updateData } = require('./database');
const { validateData } = require('./validation');

dotenv.config();

const app = express();
app.use(express.json());
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
        updateData(req.body);

        // Envie uma resposta
        res.status(200).send('Webhook received!');
    } else {
        res.status(400).send('Bad request!');
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// O serviço que iniciou o pagamento, o app, deve ficar verificando de tempos em tempos se o pagamento foi concluído.
// Para isso, ele deve fazer uma requisição para o servidor de banco de dados, que deve retornar o status do pagamento.

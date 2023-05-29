## Webhook server scaffold example

### nodejs + express

- Para iniciar o projeto de teste rode o comando
    `yarn start`

- Acesse localhost:3000/health para verificar se o servidor está rodando.
- Para testar o fluxo mande uma requisição post para Acesse localhost:3000/webhook, com qualquer
dado no corpo da requisição. Ex:
`curl --location 'localhost:3000/webhook' \
--header 'Content-Type: application/json' \
--data '{
    "amount": 100
}'`

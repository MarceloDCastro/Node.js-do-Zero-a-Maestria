const http = require('http');

const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Contenty-Type', 'text/html');
    res.end('<h1>Inserindo HTML à resposta</h1> <button>Teste</button>');
});

server.listen(port, () => {
    console.log("Servidor rodando em localhost/" + port)
})
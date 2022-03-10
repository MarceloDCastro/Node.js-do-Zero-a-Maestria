const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = q.pathname.substring(1);
    console.log(filename)

    if(filename.includes('.html')){
        if(fs.existsSync(filename)){
            fs.readFile(filename, (error, data) => {
                if (error) {
                    console.log(error);
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            })
        } else {
            res.write('<h1>Erro 404</h1> <p>Arquivo não encontrado!</p>')
        }
    }
})

server.listen(port, () => console.log("Rodando em localhost/" + port))
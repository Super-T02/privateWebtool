let http = require('http');
const PORT = 3001


const server = http.createServer((req, res) => {
    req.on('data', (chunk) => {
        console.log('You received a chunk of data', chunk);
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');

});

server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});

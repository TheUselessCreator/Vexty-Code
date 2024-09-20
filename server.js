const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080; // You can change the port as needed

const requestHandler = (req, res) => {
    const filePath = path.join(__dirname, 'packages', req.url);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

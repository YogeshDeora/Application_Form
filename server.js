const http = require('http'); 

const fs = require('fs');
 
const path = require('path');

const server = http.createServer((req, res) => {                                        
    if (req.method === 'GET') {                                                        
        if (req.url === '/') {                                                         
            fs.readFile('index.html', 'utf8', (err, data) => {                         
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.url === '/app.js') {                                             
            fs.readFile('app.js', 'utf8', (err, data) => {                              
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {                                                               
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });     
                    res.end(data);
                }
            });
        } else {                                                                        
            res.writeHead(404);
            res.end('Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/register') {                     
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);                                             
            const users = readJsonFileSync('User.json');
            users.push(data);                                                        
            writeJsonFileSync('User.json', users);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Registration successful!');
        });
    } else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

const readJsonFileSync = (filePath) => {                                          
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

const writeJsonFileSync = (filePath, data) => {                                    
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
    }
};

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

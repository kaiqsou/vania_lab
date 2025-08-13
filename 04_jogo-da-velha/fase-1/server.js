import { WebSocketServer } from "ws";
import { createServer } from "http";
import { readFile } from "fs";
import { join } from "path";

// servidor HTTP
const server = createServer((req, res)=>{
    readFile(join("public", "index.html"), (err, data) =>{ // auxilia no encontro do caminho do arquivo em todos os sistemas operacionais (usando public/index.html ou public\index.html)
        if (err) 
        {
            res.writeHead(500);
            return res.end("Erro ao carregar o index.html");
        }

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    });
});

// servidor WebSocket
const wss = new WebSocketServer({server});
import { WebSocketServer } from "ws";

// Servidor WebSocket
const wss = new WebSocketServer({port: 3000});
let currentPlayer = "X";
let board = Array(9).fill(null);
const players = [];

// Função para enviar mensagens para todos os usuários, pegando eles de dentro do array players
function broadCast(data)
{
    players.forEach(player => 
    {
        if(player.readyState == WebSocket.OPEN)
        {
            player.ws.send(JSON.stringify(data));
        }
    });
}

// Envia mensagens para um único usuário
wss.on("connection", (ws)=>
{
        if(players.length < 2)
        {
            // Jogadores
            console.log(`Jogador ${symbol} entrou. Número de jogadores: ${players.length}`);
            const symbol = players.length == 0 ? "X" : "O";
            players.push({ws, symbol});
            ws.send(JSON.stringify({type:"assign", symbol}));
        }
        else
        {
            //espectador
            ws.send(JSON.stringify({type:"assign", symbol: null}));
        }

    ws.on("close", () => {
        // procura quem se desconectou
        const index = players.findIndex(p => p.ws === ws);

        if(index !== -1)
        {
            // caso um jogador se desconecte, aqui será armazenado o símbolo desse jogador
            const desconnectSymbol = players[index].symbol

            // remove o jogador que se desconectou
            players.splice(index, 1);

            currentPlayer = "X";
            board = Array(9).fill(null);

            console.log(`Jogo terminou! O jogador ${desconnectSymbol} se desconectou.`);
            broadCast({ type: 'info', message: `Jogo terminou! O jogador ${desconnectSymbol} se desconectou.` });
            broadCast({ type: 'restart', board, currentPlayer });
        }});
        
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        if(data.type === "restart")
        {
            board = Array(9).fill(null);
            currentPlayer = "X";

            broadCast({type: "restart", board, currentPlayer});
            return;
        }

        if(data.type === "play")
        {
            if(data.symbol === currentPlayer && board[data.index] == null)
            {
                board[data.index] = data.symbol;
                currentPlayer = data.symbol === "X" ? "O" : "X";

                broadCast({type: "update", board, next: currentPlayer});
            }
        };
    });
});

console.log("Jogo da Velha rodando em http://localhost:3000");



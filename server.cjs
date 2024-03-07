const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const fs = require('fs');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

// Pobieranie danych z pliku dane.json
const danePath = './dane.json';

function pobierzDane() {
    const dane = JSON.parse(fs.readFileSync(danePath, 'utf8'));
    const temperatura = dane.temperatura; // Wyodrębnienie tylko wartości temperatury
    console.log(temperatura);
    io.emit('dane', temperatura); // Wysyłanie danych na stronę internetową
}

// Wywołuj funkcję pobierzDane co 5 minut
setInterval(pobierzDane, 10 * 1000);

// Obsługa połączenia Socket.IO
io.on('connection', (socket) => {
    console.log('Nowe połączenie Socket.IO');
    pobierzDane(); // Wysyłanie danych przy połączeniu klienta
});

// Serwer HTTP nasłuchuje
server.listen(4001, () => {
    console.log('Serwer nasłuchuje na porcie 4001');
});
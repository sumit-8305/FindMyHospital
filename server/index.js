import express from 'express';
import fs from 'fs';
import chokidar from 'chokidar';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'data.js');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

// Use cors middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get shop data
app.get('/api/get-shop-data', (req, res) => {
    import('./data.js').then(module => {
        res.json(module.default);
    }).catch(error => {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Endpoint to update shop data
app.post('/api/update-shop-data', (req, res) => {
    const updatedData = req.body;

    fs.writeFile(dataFilePath, `const shopData = ${JSON.stringify(updatedData, null, 2)}; export default shopData;`, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to update data' });
        }

        io.emit('data-updated', updatedData); // Notify all clients about the update
        res.json({ message: 'Data updated successfully' });
    });
});

// Watch for changes in data.js file and notify clients
chokidar.watch(dataFilePath).on('change', () => {
    import('./data.js').then(module => {
        io.emit('data-updated', module.default);
    }).catch(error => {
        console.error('Error watching file:', error);
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});

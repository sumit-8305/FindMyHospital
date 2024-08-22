import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import shopData from './data.js';

const app = express();
const PORT = 5000;


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST',
}));

app.use(express.json());


app.get('/api/get-shop-data', (req, res) => {
    try {
        console.log('Fetched shop data:', shopData); 
        res.json(shopData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send('Failed to fetch data');
    }
});


app.post('/api/update-shop-data', (req, res) => {
    const newShopData = req.body;

    try {
        shopData.splice(0, shopData.length, ...newShopData);
        res.send('Data saved successfully');
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(500).send('Failed to save data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

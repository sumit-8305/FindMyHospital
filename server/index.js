import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import shopData from './data.js'; 

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
}));
app.use(express.json());

const dataFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data.js');

// Endpoint to get shop data
app.get('/api/get-shop-data', (req, res) => {
    try {
        res.json(shopData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        res.status(500).send('Failed to fetch data');
    }
});

// Endpoint to update shop data and write it back to data.js
app.post('/api/update-shop-data', (req, res) => {
    const newShopData = req.body;

    try {
        // Update the in-memory shop data
        shopData.splice(0, shopData.length, ...newShopData);

        // Write the updated data back to the data.js file
        const fileContent = `const shopData = ${JSON.stringify(newShopData, null, 2)};\n\nexport default shopData;\n`;
        fs.writeFileSync(dataFilePath, fileContent, 'utf8');

        res.send('Data saved successfully');
    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(500).send('Failed to save data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

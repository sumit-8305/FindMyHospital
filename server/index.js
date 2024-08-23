import express from 'express';
import fs from 'fs';
import { checkAuth, generateToken } from './auth.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ownersFilePath = path.join(__dirname, 'owners.js');
const dataFilePath = path.join(__dirname, 'data.js');
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

const app = express();
app.use(cors());
app.use(express.json());


// app.get('/api/login', (req, res) => {
//     import('./owners.js').then(module => {
//         res.json(module.default);
//     }).catch(error => {
//         console.error('Error retrieving data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     });
// });

let owners;
try {
    owners = (await import('./owners.js')).default;
} catch (error) {
    console.error('Error loading owners file:', error);
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    import('./owners.js')
      .then((module) => {
        const owners = module.default;
  
        const owner = owners.find(
          (o) => o.username === username && o.password === password
        );
  
        if (owner) {
          const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  
          res.json({ token }); // Send token back to client
        } else {
          res.status(403).json({ message: 'Invalid credentials' });
        }
      })
      .catch((error) => {
        console.error('Error reading owners file:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  
// app.use('/api/get-shop-data', checkAuth);
app.use('/api/update-shop-data', checkAuth);

app.get('/api/get-shop-data', (req, res) => {
    import('./data.js').then(module => {
        res.json(module.default);
    }).catch(error => {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    });
});

app.post('/api/update-shop-data', (req, res) => {
    const updatedData = req.body;

    fs.writeFile('./data.js', `const shopData = ${JSON.stringify(updatedData, null, 2)}; export default shopData;`, (err) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ message: 'Failed to update data' });
        }

        io.emit('data-updated', updatedData);
        res.json({ message: 'Data updated successfully' });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

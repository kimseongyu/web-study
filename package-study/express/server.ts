import express from 'express';
import { JsonDB, Config } from 'node-json-db';

const app = express();
app.use(express.json());

const db = new JsonDB(new Config('myDatabase', true, false, '/'));

app.get('/data/:id', (req, res) => {
    try {
        const data = db.getData(`/${req.params.id}`);
        res.json({ data });
    } catch (error) {
        res.status(404).json({ message: 'Data not found' });
    }
});

app.post('/data', (req, res) => {
    const { id, value } = req.body;
    db.push(`/${id}`, value);
    res.status(201).json({ message: 'Data added successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

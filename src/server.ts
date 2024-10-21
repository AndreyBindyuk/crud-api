import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const users: Record<string, any> = {};

app.post('/api/users', (req, res) => {
  const { age, hobbies } = req.body;
  if (typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).send('Invalid request body');
  }
  const id = uuidv4();
  const newUser = { id, age, hobbies };
  users[id] = newUser;
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

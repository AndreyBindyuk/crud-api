import express from 'express';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const users: Record<string, any> = {};

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('500 Error');
});

app.get('/api/users', (req, res) => {
  res.status(200).json(Object.values(users));
});

// GET user by ID
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  if (!uuidValidate(userId)) {
    res.status(400).send('Invalid UUID');
  }
  const user = users[userId];
  if (!user) {
    res.status(404).send('User not found');
  }
  res.status(200).json(user);
});

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

app.put('api/users/:userId', (req, res) => {
  const { userId } = req.params;
  if (!uuidValidate(userId)) {
    res.status(400).send('Invalid UUID');
  }
  const user = users[userId];
  if (!user) {
    res.status(404).send('User not found');
  }
  const { age, hobbies } = req.body;
  if (typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.status(400).send('Invalid request body');
  }

  user.age = age;
  user.hobbies = hobbies;
  res.status(200).json(user);
});

app.delete('api/user/:userId', (req, res) => {
  const { userId } = req.params;
  if (!uuidValidate(userId)) {
    res.status(400).send('Invalid UUID');
  }
  const user = users[userId];
  if (!user) {
    res.status(404).send('User not found');
  }
  delete users[userId];
  res.status(204).send();
});

app.use((_, res) => {
  res.status(404).send('404 Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

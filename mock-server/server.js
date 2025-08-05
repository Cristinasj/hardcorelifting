const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'supersecretkey';

app.use(cors());
app.use(bodyParser.json());

// In-memory user store with pre-populated user and exercise data
const exercises = [
  'bench_press',
  'deadlift',
  'squat',
  'overhead_press',
  'barbell_row'
];

const users = [
  {
    username: 'noah',
    password: '1234',
    entries: [
      // Example entries for each exercise
      { exercise: 'bench_press', amount: 100, unit: 'kg', timestamp: Date.now() - 100000 },
      { exercise: 'bench_press', amount: 105, unit: 'kg', timestamp: Date.now() - 50000 },
      { exercise: 'bench_press', amount: 110, unit: 'kg', timestamp: Date.now() },
      { exercise: 'deadlift', amount: 150, unit: 'kg', timestamp: Date.now() - 120000 },
      { exercise: 'deadlift', amount: 160, unit: 'kg', timestamp: Date.now() - 60000 },
      { exercise: 'deadlift', amount: 170, unit: 'kg', timestamp: Date.now() },
      { exercise: 'squat', amount: 120, unit: 'kg', timestamp: Date.now() - 130000 },
      { exercise: 'squat', amount: 130, unit: 'kg', timestamp: Date.now() - 70000 },
      { exercise: 'squat', amount: 140, unit: 'kg', timestamp: Date.now() },
      { exercise: 'overhead_press', amount: 60, unit: 'kg', timestamp: Date.now() - 140000 },
      { exercise: 'overhead_press', amount: 65, unit: 'kg', timestamp: Date.now() - 80000 },
      { exercise: 'overhead_press', amount: 70, unit: 'kg', timestamp: Date.now() },
      { exercise: 'barbell_row', amount: 80, unit: 'kg', timestamp: Date.now() - 150000 },
      { exercise: 'barbell_row', amount: 85, unit: 'kg', timestamp: Date.now() - 90000 },
      { exercise: 'barbell_row', amount: 90, unit: 'kg', timestamp: Date.now() }
    ]
  }
];

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  users.push({ username, password });
  return res.status(201).json({ message: 'User registered' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

// Protected test endpoint
app.get('/api/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ username: decoded.username });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// List exercises endpoint
app.get('/api/exercises', (req, res) => {
  return res.json({ exercises });
});

// Add exercise entry endpoint
app.post('/api/exercise-entry', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const { exercise, amount, unit } = req.body;
  if (!exercise || !amount || !unit) {
    return res.status(400).json({ error: 'Missing exercise, amount, or unit' });
  }
  if (!exercises.includes(exercise)) {
    return res.status(400).json({ error: 'Unknown exercise' });
  }
  const user = users.find(u => u.username === decoded.username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.entries.push({
    exercise,
    amount,
    unit,
    timestamp: Date.now()
  });
  return res.status(201).json({ message: 'Entry added' });
});

// Get user info endpoint
app.get('/api/user-info', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const user = users.find(u => u.username === decoded.username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // For each exercise, get most recent and PR
  const info = {};
  exercises.forEach(ex => {
    const entries = user.entries.filter(en => en.exercise === ex);
    if (entries.length === 0) return;
    // Most recent
    const mostRecent = entries.reduce((a, b) => a.timestamp > b.timestamp ? a : b);
    // PR (max amount)
    const pr = entries.reduce((a, b) => a.amount > b.amount ? a : b);
    info[ex] = {
      mostRecent: { amount: mostRecent.amount, unit: mostRecent.unit, timestamp: mostRecent.timestamp },
      pr: { amount: pr.amount, unit: pr.unit, timestamp: pr.timestamp }
    };
  });
  return res.json({ username: user.username, exercises: info });
});

// Get exercise history endpoint
app.get('/api/exercise-history/:exercise', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const user = users.find(u => u.username === decoded.username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const exercise = req.params.exercise;
  if (!exercises.includes(exercise)) {
    return res.status(400).json({ error: 'Unknown exercise' });
  }
  const history = user.entries
    .filter(en => en.exercise === exercise)
    .map(en => ({
      timestamp: en.timestamp,
      amount: en.amount,
      unit: en.unit
    }));
  return res.json({ exercise, history });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log("Mock server running on http://");
});

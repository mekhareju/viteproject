const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const profileRoutes = require('./routes/profile'); 
const flowerRoutes = require('./routes/flowers');

const app = express();

const corsOptions = {
 origin: ['http://localhost:5173'], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
//app.use(cors()); 
app.use(express.json());
//app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://mekhareju:user123@cluster0.gakd5.mongodb.net/giftShopDB?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/flowers', flowerRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

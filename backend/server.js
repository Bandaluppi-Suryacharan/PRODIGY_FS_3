require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth'); // <-- Add this line
const orderRoutes = require('./routes/orderRoutes');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // <-- Mount auth routes
app.use('/api', orderRoutes);
app.get('/', (req, res) => {
  res.send('API is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

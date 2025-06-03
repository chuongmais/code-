const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');
require('dotenv').config();

// Cho phép nhiều origin trong dev
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());


app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

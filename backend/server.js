const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
  
app.use(express.json());

connectDB();

app.use('/api', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
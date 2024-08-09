const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error stack trace to the console
    res.status(500).json({ message: 'Something went wrong!' }); // Sends a generic error message to the client
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

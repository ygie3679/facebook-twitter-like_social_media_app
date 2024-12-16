const postsRoutes = require("./routes/posts_routes");
const usersRoutes = require("./routes/users_routes");

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

// Connect to MongoDB
//const mongoDBEndpoint = "mongodb+srv://yaji:12345@webdev5610.bf7sg.mongodb.net/?retryWrites=true&w=majority&appName=WebDev5610";
const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/collection_name';

mongoose
.connect(mongoDBEndpoint, { useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Start server

app.get('/', (request, response) => {
  response.send("Welcome to WebDev");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
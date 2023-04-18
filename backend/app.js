const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("express-async-errors");
require('./db');
const userRoutes = require("./routes/user");
const { errorhandler } = require("./middlewares/error");

const app = express();
app.use(express.json())
app.use(morgan("dev"))
app.use('/api/user', userRoutes);

app.use(errorhandler);

app.listen(8000, () => {
   console.log("App Running on port Number 8000")
})
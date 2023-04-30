const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
require("dotenv").config();
require("express-async-errors");
require('./db');
const userRoutes = require("./routes/user");
const { errorhandler } = require("./middlewares/error");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use('/api/user', userRoutes);

app.use('/*', handleNotFound)

app.use(errorhandler);

app.listen(8000, () => {
   console.log("App Running on port Number 8000")
})
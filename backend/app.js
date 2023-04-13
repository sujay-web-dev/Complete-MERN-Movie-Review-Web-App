 const express = require("express");
 const userRoutes = require("./routes/user")

 const app = express();
 app.use(express.json())
 app.use('/api/user',userRoutes);


 app.listen(8000,() => {
    console.log("App Running on port Number 8000")
 })
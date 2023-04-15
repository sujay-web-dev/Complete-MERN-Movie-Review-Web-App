const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/review_app')
    .then(() => {console.log("Successful DB connected");})
    .catch(()=> {console.log("Error while connecting db");})
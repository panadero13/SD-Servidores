const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@sd-database.uzlmd.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = () => {
   mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
   console.log("DB Connected");
}

module.exports= connectDB;
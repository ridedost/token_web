const mongoose = require("mongoose");

const url =
  "mongodb+srv://admin:TechGlide@tokenapp.kkaa1yk.mongodb.net/token_web_app?retryWrites=true&w=majority";

const connection = mongoose.connect(url);

module.exports = { connection };

//"mongodb+srv://chandnwj:chandbabu@cluster0.jsk2z6k.mongodb.net/token-app?retryWrites=true&w=majority"

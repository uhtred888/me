// connection
require('dotenv').config();
require('dotenv').config(".env");
const mongoose = require("mongoose")

function conn()
{   
try {
    mongoose.connect(process.env.mango,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Timeout after 50 seconds
}).then(console.log("Db connected."))

} catch (error) {
    console.log("Connection failled"+error);
}

}


module.exports.conn = conn()

// connection
require('dotenv').config("./.env");
const mongoose = require("mongoose")

function conn()
{   
try {
    mongoose.connect(process.env.mango).then(console.log("Db connected."))

} catch (error) {
    console.log("Connection failled"+error);
}

}


module.exports.conn = conn()

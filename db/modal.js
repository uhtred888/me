const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fName :{
        type : String,
        required : true
    },
    lName :{
        type :String,
        required :true
    },
    phoNum:{
        type:Number,
        required:true
    },
    mail :{
        type : String,
        required :true
    },
    add :{
        type:String,
        required :true
    },
    msg :{
        type:String,
        required:true
    }
},
{timestamp:true});

const wbPage = mongoose.model('wbPage', schema);

module.exports = wbPage;
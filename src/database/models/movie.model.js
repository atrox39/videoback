const {Schema, model} = require('mongoose');
const {String, Number} = require('mongoose').Schema.Types;

module.exports.Movie = model("Movie", new Schema({
    title:{
        type: String,
        minlength: 6,
        maxlength: 120,
        require: true
    },
    serverPath:{
        type: String,
        require: true
    },
    path:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    }
},{
    timestamps:true
}));
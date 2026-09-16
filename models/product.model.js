const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        price: {type:Number, min:0, required:true},
        description: {type:String, required:true},
        category: {type:String, required:true},
        inStock: {type:Boolean, default:true},
    },
    {timestamps: true}
)

const product = mongoose.model("Product", productSchema);

module.exports = product




const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String
        },

        category: {
            type: String,
            required: true
        },

        inStock: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Index product name for text search
productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;




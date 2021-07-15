const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        get: (price) => (price/100).toFixed(2),
        set: (price) => Math.ceil(price*100)
    }
});

ProductSchema.methods.toJSON = function () {
    return {
        id: this._id,
        sku: this.sku,
        name: this.name,
        type: this.type,
        price: this.price
      }
    }

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
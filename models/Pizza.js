const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaname: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'large'
    },
    toppings: []
});

// creates the pizza model using the pizzaschema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
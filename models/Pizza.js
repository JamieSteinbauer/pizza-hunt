const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaname: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter is a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: "large",
    },
    toppings: [],
    // ref property is important bc it tells the pizza model which documents to search to find the right comments
    comments: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // set to false bc this is a virtual that mongoose returns
    id: false,
  }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// creates the pizza model using the pizzaschema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;

// virtuals allow you to add cirtual properties to a document that isnt stored in the database
// normally computed values that get evaluated when you try to access their properties
// virtuals allowus to add more info to a database response that we dont have to add in the info manually with a helper before responding to the api request

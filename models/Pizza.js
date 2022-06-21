const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      // you can use a custom error message
      required: true,
      //removes whitespace which is useful for password and username
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter is a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      // enumerable refers to a set of data that can be iterated over
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      deafult: 'Large'
    },
    toppings: [],
    // ref property is important bc it tells the pizza model which documents to search to find the right comments
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// reduce takes two parameters, an accumulator and a currentvalue
//accumuulator is the total and the currentvalue is the comment

// creates the pizza model using the pizzaschema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;

// virtuals allow you to add cirtual properties to a document that isnt stored in the database
// normally computed values that get evaluated when you try to access their properties
// virtuals allowus to add more info to a database response that we dont have to add in the info manually with a helper before responding to the api request

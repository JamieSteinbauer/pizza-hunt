const { Pizza } = require("../models");

const pizzaController = {
  // get all pizzas
  // serves as a callback function for the GET api/pizzas route
  getAllPizza(req, res) {
    Pizza.find({})
      //chain the populate method onto the query to see the comment
      // slect is used so that it tells mongoose that we dont care about the --v field
      .populate({
        path: 'comments',
        select: '-__v',
      })
      .select('-__v')
      //sorts in desc order by the id value, timestamp is hidden but it displays the newest pizza first
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one pizza by id
  getPizzaById({ params }, res) {
    // instead of using the entire REQ, destructured params out of it bc thats the only data needed
    Pizza.findOne({ _id: params.id })
      .then((dbPizzaData) => {
        //if no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "no pizza found with this id " });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create pizza
  //destructured body bc we dont need to interface with any of the other data it provides
  createPizza({ body }, res) {
    //.create() will handle either one or multiple inserts with mongoose
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  //update pizza by id
  updatePizza({ params, body }, res) {
    // if new: true is not set, it will return the original document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;

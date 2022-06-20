const router = require('express').Router();

// destructure the method names out fo the imported object and use those names directly
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

//set up get all and post at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//set up get one, put, and delete at /api/pizzas/:id
router  
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;

// post route /api/pizzas
const router = require('express').Router();
//import all the api routes from /api/index.js (index.js is implied)
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

//add prefic of '/api/ to all fot he api routes imported from the api directory
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;

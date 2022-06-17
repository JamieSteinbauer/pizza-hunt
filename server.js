const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// tells the mongoose which database we want to connect to
//i fht emongodb_uri exists, it will use that otherwise it will short circuit to the local mongodb servers database
// the second argument in the example is a set of configuration options mongoose asks for more info about
// if it connects to adatabase that isnt there, it will create it itself
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queiries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

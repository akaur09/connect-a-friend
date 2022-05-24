// Require Express
const express = rewquire('express');
// Require Mongoose
const mongoose = require('mongoose');

const app = express();
const PORT= process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(require('./routes'));
// Connect Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost-connect-a-friend', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// Log Mongoose Queries
mongoose.set('debug',true);

app.listen(PORT, () => console.log(`Connected to server on localhost on ${PORT}`));
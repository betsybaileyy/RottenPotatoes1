const express = require('express')
const methodOverride = require('method-override')
const app = express()
var exphbs = require('express-handlebars');
const jobs = require('./controllers/jobs');
const mongoose = require('mongoose');
const comments = require('./controllers/comments');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/retro-retire');

const bodyParser = require('body-parser');

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

require('./controllers/jobs')(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

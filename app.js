const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useMongoClient: true
});

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));




// let reviews = [
//   { title: "Great Review!" },
//   { title: "Next Review" }
// ]

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {
                reviews: reviews
            });
        })
        .catch(err => {
            console.log(err);
        })
})

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('reviews-index', {
        reviews: reviews
    });
})

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
    console.log(req.body);
    res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) =>{
        console.log(err.message);
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


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

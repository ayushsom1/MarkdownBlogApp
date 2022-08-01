const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// used to connect the database 
mongoose.connect('mongodb://localhost/blog')

// used set method to use the ejs means accessing html files or accessing views 
app.set('view engine', 'ejs')

// TODO
// the use is used to get the accessing permission for accesing all the fields as re.body.
app.use(express.urlencoded({ extended: false }))

//if we set the parameter "_method" in any type of form it override the method
app.use(methodOverride('_method'))

// main get method for home page
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

// for routing 
// TODO
app.use('/articles', articleRouter)

app.listen(5000)


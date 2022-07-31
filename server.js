const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article 1',
        createdAt: new Date(),
        description: 'Test Description 1'
    }, {
        title: 'Test Article 1',
        createdAt: new Date(),
        description: 'Test Description 2'
    }]
    res.render('index', { articles: articles })
})

app.listen(5000)
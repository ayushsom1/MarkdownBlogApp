const express = require('express')
const router = express.Router()

// accesing the schema
const Article = require('../models/article')



// this get method is used to get blank fields of form
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

// to edit the article
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})


// this get method is used to show a particular article from the list 
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})


// This POST method executes after when new article is added from new.ejs 
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

// PUT method to update the article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

//and we are know that our post and put are mostly similar therefore we put the put method in seperate function
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            // used to save the article on database
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e)
            res.render('articles/${path}', { article: article })
        }
    }
}


// A link only does get and a form only does get and post methods so making delete method we have to install an another library called METHOD OVERRIDE
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router
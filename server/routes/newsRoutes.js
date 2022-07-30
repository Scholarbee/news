const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController.js');

/**
 * App Routes 
*/
router.get('/', newsController.homepage);
router.get('/news/:id', newsController.exploreNews );
router.get('/categories', newsController.exploreCategories);
router.get('/categories/:id', newsController.exploreCategoriesById);
router.post('/search', newsController.searchNews);
router.get('/explore-latest', newsController.exploreLatest);
router.get('/explore-random', newsController.exploreRandom);
router.get('/submit-news', newsController.submitNew);
router.post('/submit-news', newsController.submitNewsOnPost);

 
module.exports = router;
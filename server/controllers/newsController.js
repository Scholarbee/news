require('../models/database');
const Category = require('../models/Category');
const News = require('../models/News');

/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req, res) => {
    // res.render('index', { title: 'Home Page' })
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await News.find({}).sort({_id: -1}).limit(limitNumber);
    const latestNews = await News.find({ 'category': 'Entertainment' }).limit(limitNumber);
    const latestStories = await News.find({ 'category': 'Story' }).limit(limitNumber);

    const food = { latest, latestNews, latestStories };

    res.render('index', { title: 'Stories and News Blog - Home', categories, food} );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categoreis', categories } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await News.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'News Blog - Categoreis', categoryById } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
} 
 
/**
 * GET /news/:id
 * News 
*/
exports.exploreNews = async(req, res) => {
  try {
    let newsId = req.params.id;
    const news = await News.findById(newsId);
    res.render('news', { title: 'News Blog - News', news } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchNews = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let news = await News.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'News Blog - Search', news } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const news = await News.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', news } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await News.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let news = await News.findOne().skip(random).exec();
    res.render('explore-random', { title: 'News Blog - Explore Random', news } );
  } catch (error) {
    console.log(error)
    // res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /submit-news
 * Submit News
*/
exports.submitNew = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-news', { title: 'News Blog - Submit News', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-news
 * Submit News
*/
exports.submitNewsOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newNews = new News({
      name: req.body.name,
      content: req.body.description,
      email: req.body.email,
      writer: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newNews.save();

    req.flash('infoSubmit', 'Article has been added.')
    res.redirect('/submit-news');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-news');
  }
}







// async function insertDymmyRecipeData(){
//   try {
//     await News.insertMany([
//       { 
//         "name": "Sport",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Entertainment", 
//         "image": "chocolate-1.jpg"
//       },
//       { 
//         "name": "Eba",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Story", 
//         "image": "mexican-food.jpg"
//       },
//       { 
//         "name": "Banku",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Sport", 
//         "image": "chocolate-1.jpg"
//       },
//       { 
//         "name": "Gob3",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Story", 
//         "image": "mexican-food.jpg"
//       },
//       { 
//         "name": "Wakye",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Entertainment", 
//         "image": "chocolate-1.jpg"
//       },
//       { 
//         "name": "Soakings",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Story", 
//         "image": "chocolate-1.jpg"
//       },
//       { 
//         "name": "Recipe Name Goes Here",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Entertainment", 
//         "image": "mexican-food"
//       },
//       { 
//         "name": "Yam",
//         "content": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "writer": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Story", 
//         "image": "chocolate-1.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();



/**
 * Dummy Data Example 
*/

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Entertainment",
//         "image": "thai-food.jpg"
//       },
//       {
//         "name": "Sport",
//         "image": "american-food.jpg"
//       }, 
//       {
//         "name": "Education",
//         "image": "chinese-food.jpg"
//       },
//       {
//         "name": "Health",
//         "image": "mexican-food.jpg"
//       }, 
//       {
//         "name": "Story",
//         "image": "indian-food.jpg"
//       },
//       {
//         "name": "Others",
//         "image": "spanish-food.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyCategoryData();
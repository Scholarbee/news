const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  content: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  writer: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['Story', 'Entertainment', 'Health', 'Education', 'Sport', 'Others'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  }
});

newsSchema.index({ name: 'text', content: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('News', newsSchema);
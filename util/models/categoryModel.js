const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sousCategories: {
    type: [String],
    default: [],
    required: false
  }
},
{
  timestamps: true
});
module.exports = mongoose.models.Categorie || mongoose.model('Categorie', categorieSchema);
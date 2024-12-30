const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: String,
  description: String,
  prix: Number,
  catégorie: String,
  sousCatégorie: String,
  marque: String,
  poids: Number,
  volume: Number,
  couleur: String,
  tags: [String],
  image: String,
  images: [String],
  quantitéEnStock: Number,
  dateDeSortie: Date,
  disponible: Boolean,
  caractéristiques: Object,
  commentaires: [{
    // Schéma pour les commentaires d'utilisateurs
    auteur: String,  // Nom de l'auteur du commentaire
    note: Number,    // Note donnée au produit
    texte: String,   // Texte du commentaire
    date: Date       // Date du commentaire
  }],
  metaTitre: String,
  metaDescription: String,
  motsClés: [String],
  slug: String,
  canonical: String,
  robots: String
});

const Produit = mongoose.model('Produit', productSchema);

module.exports = Produit;
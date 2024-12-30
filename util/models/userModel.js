const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prénom: String,
  email: String,
  motDePasse: String,
  adresse: String,
  numéroDeTéléphone: String,
  commandes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande'
  }],
  createdAt: Date,
  updatedAt: Date,
  isAdmin: Boolean,
  imageProfil: String,
  dateDeNaissance: Date,
  sexe: String,
  languePréférée: String,
  historiqueAchats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande'
  }],
  listeDeSouhaits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit'
  }],
  adressesDeLivraison: [{
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
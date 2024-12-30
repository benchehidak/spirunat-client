const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  produits: [{
    produit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit',
      required: false,
    },
    quantité: Number
  }],
  montantTotal: Number,
  statut: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date,
  adresseDeLivraison: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  méthodeDePaiement: String,
  informationsDePaiement: {
    type: String,
    numéro: String,
    dateExpiration: String,
    titulaire: String,
    cvv: String,
  },
  méthodeDexpédition: String,
  informationsDexpédition: {
    transporteur: String,
    numéroDeSuivi: String
  },
  remises: [{
    code: String,
    montant: Number,
    pourcentage: Number
  }],
  commentaires: String
});

const Commande = mongoose.model('Commande', orderSchema);

module.exports = Commande;
let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let UtilisateurSchema = Schema({
    id: Number,
    identifiant: String,    
    password: String,
    photo:String,
    statue: String
});

UtilisateurSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Utilisateur', UtilisateurSchema);

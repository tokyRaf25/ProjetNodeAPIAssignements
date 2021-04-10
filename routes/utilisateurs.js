//Utilisateur.js est le "modèle mongoose", il est connecté à la base de données
let Utilisateur = require("../model/Utilisateur.js");
var sha1 = require('node-sha1');

// Récupérer tous les Utilisateurs (GET), AVEC PAGINATION
function getUtilisateurs(req, res) {
  var aggregateQuery = Utilisateur.aggregate();
  
  Utilisateur.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, Utilisateurs) => {
      if (err) {
        res.send(err);
      }
      res.send(Utilisateurs);
    }
  );
}

// Récupérer un Utilisateur par son id (GET)
function getUtilisateur(req, res) {
  let utilisateurId = req.params.id;

  Utilisateur.findOne({ id: utilisateurId }, (err, Utilisateur) => {
    if (err) {
      res.send(err);
    }
    res.json(Utilisateur);
  });
}

// Ajout d'un Utilisateur (POST)
function postUtilisateur(req, res) {
  let utilisateur = new Utilisateur();
  utilisateur.id = req.body.id;
  utilisateur.identifiant = req.body.identifiant;
  utilisateur.password =sha1( req.body.password );
  utilisateur.photo =   req.body.photo ;
  utilisateur.statue = req.body.statue;
  console.log(req);
  console.log("prof Nom ------->",req.body.identifiant);
  console.log("POST Utilisateur reçu :");

  utilisateur.save((err) => {
    if (err) {
      res.send("cant post Utilisateur ", err);
    }
    res.json({ message: `${utilisateur.identifiant} saved!` });
  });
}

// Update d'un Utilisateur (PUT)
function updateUtilisateur(req, res) {
  console.log("UPDATE recu Utilisateur : ");
  console.log(req.body);
  Utilisateur.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, Utilisateur) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
      // console.log('updated ', Utilisateur)
    }
  );
}

// suppression d'un Utilisateur (DELETE)
function deleteUtilisateur(req, res) {
  Utilisateur.findByIdAndRemove(req.params.id, (err, Utilisateur) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${Utilisateur.nom} deleted` });
  });
}


//Verification d'un Utilisateur (POST)
function chekcUtilisateur(req, res) {
    console.log( req.params );
    let userIdentifiant=req.body.identifiant;
    let userPassword=sha1( req.body.password );
    
    console.log( userIdentifiant + " --" + userPassword);
    Utilisateur.findOne(
      { identifiant: userIdentifiant , password : userPassword }
      , (err, Utilisateur) => {
        if (err) {
          res.send(err);
        }
        res.json(Utilisateur);
      }
    );
  
}


module.exports = {
  getUtilisateurs,
  postUtilisateur,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  chekcUtilisateur
};

//Matier.js est le "modèle mongoose", il est connecté à la base de données
let Matier = require("../model/matier.js");


// Récupérer tous les Matiers (GET), AVEC PAGINATION
/*
function getMatiers(req, res) {
  var aggregateQuery = Matier.aggregate();
  
  Matier.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, Matiers) => {
      if (err) {
        res.send(err);
      }
      res.send(Matiers);
    }
  );
}
*/

/* Version sans pagination */
// Récupérer tous les assignments (GET)
function getMatiers(req, res){
    Matier.find((err, matiers) => {
        if(err){
            res.send(err)
        }
        res.send(matiers);
    });
}



// Récupérer un Matier par son id (GET)
function getMatier(req, res) {
  let MatierId = req.params.id;

  Matier.findOne({ id: MatierId }, (err, Matier) => {
    if (err) {
      res.send(err);
    }
    res.json(Matier);
  });
}

// Ajout d'un Matier (POST)
function postMatier(req, res) {
  let matier = new Matier();
  matier.id = req.body.id;
  matier.nomProf = req.body.nomProf;
  matier.nomMatier = req.body.nomMatier;
  matier.photoProf = req.body.photoProf;
  matier.photoMatier = req.body.photoMatier;
  console.log(req);
  console.log("prof Nom------->",req.body.nomProf);
  console.log("POST matier reçu :");

  matier.save((err) => {
    if (err) {
      res.send("cant post Matier ", err);
    }
    res.json({ message: `${matier.nomMatier} saved!` });
  });
}

// Update d'un Matier (PUT)
function updateMatier(req, res) {
  console.log("UPDATE recu Matier : ");
  console.log(req.body);
  Matier.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, Matier) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
      // console.log('updated ', Matier)
    }
  );
}

// suppression d'un Matier (DELETE)
function deleteMatier(req, res) {
  Matier.findByIdAndRemove(req.params.id, (err, Matier) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${Matier.nom} deleted` });
  });
}

module.exports = {
  getMatiers,
  postMatier,
  getMatier,
  updateMatier,
  deleteMatier,
};

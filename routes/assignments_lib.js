// Assignment est le "modèle mongoose", il est connecté à la base de données
let Assignment_lib = require("../model/assignment_lib");
let Matier = require('../model/matier');

function findInMatier(matiers, id) {
  var elm ;
  matiers.forEach(function (element) {
    if (element.id === id) {
      elm = element;
    }
  });
  return elm;
}

// Récupérer tous les assignments (GET), AVEC PAGINATION
function getAssignments_Lib(req, res) {
  var aggregateQuery = Assignment_lib.aggregate();
  var ls_rendue = [];
  var ls_non_rendue = [];
  Matier.find((err, matiers) => {
    if (err) {
      console.log(err);
    }
    console.log("My matiers originals ", matiers);
    Assignment_lib.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        assignments.docs.forEach(function (element) {
          var dt_matier = findInMatier(matiers, element.idMatiere);
          element.nomMatier= dt_matier.nomMatier;
          element.photoProf= dt_matier.photoProf;
          element.photoMatier= dt_matier.photoMatier;
          if( element.rendu ){
            ls_rendue.push( element );
          }else{
            ls_non_rendue.push( element );
          }
        });
        // console.log( ls_rendue );
        // console.log( ls_non_rendue );
        assignments.docs = ls_rendue ;
        assignments.docs_non_rendue = ls_non_rendue ;
        res.send(assignments);
      }
    );
  });

}





module.exports = {
  getAssignments_Lib
};

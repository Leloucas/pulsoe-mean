var mongoose = require('mongoose');
var Area = mongoose.model('Area');

module.exports.catGetall = function(req, res){
  var areaId  = req.params.areaId;
  console.log("GET categorias");

  Area
    .findById(areaId)
    .select('categorias')
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : []
      };
      if (err){
        console.log("Error finding reviews")
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Area id not found in database", areaId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + areaId
        };
      } else {
        console.log('Returned categorias', doc);
        response.message = doc.categorias ? doc.categorias : [];
      }
      res
        .status(response.status)
        .json( response.message );
    });
};

module.exports.catAddOne = function(req, res){
  var areaId  = req.params.areaId;
  console.log("POST categoria");

  Area
    .findById(areaId)
    .select('categorias')
    .exec(function(err, area){
      var response = {
        status : 200,
        message : area
      };

      if(err){
        console.log("Error finding categorias");
        response.status = 500;
        response.message = err;
      } else if(!area) {
        console.log("Area id not found in database", areaId);
        response.status = 404;
        response.message = {
          "message" : "Area ID not found " + areaId
        };
      }
      if (area) {
        area.categorias.push({
          name : req.body.name,
          descripcion : req.body.descripcion
        });
        area.save(function(err, areaUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(201)
              .json(areaUpdated.categorias[areaUpdated.categorias.length - 1]);
          }
        });
      } else {
        res
          .status(response.status)
          .json( response.message );
      }
    });

};

module.exports.catGetOne = function(req, res){
  var areaId = req.params.areaId;
  var catId = req.params.catId;

  console.log("GET the catID "+ catId + " for areaId "+areaId);

  Area
    .findById(areaId)
    .select('categorias')
    .exec(function(err, area){
      var response = {
        status : 200,
        message : area
      };

      console.log("Returned area", area);
      if(!area){
        console.log("Error finding area "+areaId);
        response.status = 404;
        response.message = {
          "message" : "El área buscada no existe"
        };
      } else {
        var categoria = area.categorias.id(catId);
        response.message = categoria;
      }

      if(err){
        console.log("Error finding categoria for area "+areaId);
        response.status = 500;
        response.message = err;
      } else if(!categoria) {
        response.status = 404;
        response.message = {
          "message" : "La categoría buscada no existe"
        };
      }

      res
        .status(response.status)
        .json(response.message);

    });
};

module.exports.catUpdateOne = function(req, res){
  var areaId = req.params.areaId;
  var catId = req.params.catId;

  console.log("PUT the catID "+ catId + " for areaId "+areaId);

  Area
    .findById(areaId)
    .select('categorias')
    .exec(function(err, area){
      var thisCat;

      var response = {
        status : 200,
        message : []
      };

      if (err){
        console.log("Error finding categoria for area "+ areaId);
        response.status = 500;
        response.message = err;
      } else if(!area) {
        response.status = 404;
        response.message = {
          "message" : "Area ID not found" + areaId
        };
      } else {
        // GET the review
        thisCat = area.categorias.id(catId);
        // if the review doesn't exist mongoose returns null
        if(!thisCat){
          response.status = 404;
          response.message = {
            "message" : "Categoria ID not found "+catId
          };
        }
      }

      if(response.status !== 200){
        res
          .status( response.status )
          .json(response.message);
      } else {
        if(req.body.name){
          thisCat.name = req.body.name;
        }

        thisCat.descripcion = req.body.descripcion;

        area.save(function(err, areaUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.catDeleteOne = function(req, res){
  var areaId = req.params.areaId;
  var catId = req.params.catId;

  console.log('DELETE the catId ' + catId + ' for the areaId '+areaId);

  Area
    .findById(areaId)
    .select('categorias')
    .exec(function(err, area){
      var thisCat;
      var response = {
        status : 200,
        message : []
      };

      if (err){
        console.log("Error finding categoria for area "+ areaId);
        response.status = 500;
        response.message = err;
      } else if(!area) {
        response.status = 404;
        response.message = {
          "message" : "Area ID not found" + areaId
        };
      } else {
        thisCat = area.categorias.id(catId);

        if(!thisCat){
          response.status = 404;
          response.message = {
            "message" : "ID de la categoría no encontrada " + catId
          };
        }
      }

      if(response.status !== 200){
        res
          .status( response.status )
          .json( response.message );
      } else {
        console.log("Deleting categoria " + catId);
        area.categorias.id(catId).remove();
        area.save(function(err, areaUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

var mongoose = require('mongoose');
var Area = mongoose.model('Area');

module.exports.areasGetAll = function(req, res){
  console.log('GET the areas');

  var count;
  var offset;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  if(isNaN(offset)){
    offset = '';
  }

  if(isNaN(count)){
    count = '';
  }
  
  Area
    // .find({ 'deletedAt': null })
    .find()
    .sort('createdOn')
    .limit(count)
    .skip(offset)
    .sort('-createdOn')
    .exec(function(err, areas){
      if (err) {
        console.log("Error finding areas");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found areas: ", areas.length);
        res
          .status(200)
          .json(areas);
      }
    });
};

module.exports.areasGetOne = function(req, res){
  var areaId  = req.params.areaId;
  console.log("GET the area " + areaId);

  Area
    .findById(areaId)
    .select('-categorias')
    .exec(function(err, area){
      if(err){
        console.log("Error finding area "+areaId);
        res
          .status(500)
          .json(err);
      }else if(!area){
        console.log("Area " + areaId + " not found. :(");
        res
          .status(404)
          .json({
            "message" : "Area not found"
          });
      } else {
        console.log("Found area " + areaId);
        res
          .status(200)
          .json(area);
      }
    });
};

module.exports.areasAddOne = function(req, res){
  console.log("POST new area");
  console.log(req.body);
  Area
    .create({
      name : req.body.nombre,
      descripcion : req.body.descripcion || ''
    }, function(err, area){
      if(err){
        console.log("Error creating area");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Area created", area);
        res
          .status(201)
          .json(area);
      }
    });
};

module.exports.areasUpdateOne = function(req, res){
  var areaId  = req.params.areaId;
  console.log("PUT area " + areaId);

  Area
    .findById(areaId)
    .exec(function(err, area){
      var response = {
        status : 200,
        message : []
      };

      if(err){
        console.log("Error al actualizar el área");
        response.status = 500;
        response.message = err;
      } else if(!area){
        console.log("Área no encontrada", areaId);
        response.status = 404;
        response.message = {
          "message" : "área no encontrada " + areaId
        };
      }
      if(area){
        var newArea = req.body;
        if(newArea.name){
          area.name = newArea.name
        }

        area.descripcion = newArea.descripcion;

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
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

module.exports.areasRestoreOne = function(req, res){
  var areaId  = req.params.areaId;
  console.log("PATCH Area " + areaId);

  Area
    .findById(areaId)
    .select('deletedAt')
    .exec(function(err, area){
      var response = {
        status : 200,
        message : []
      };

      if(err){
        console.log("Error al actualizar el área");
        response.status = 500;
        response.message = err;
      } else if(!area){
        console.log("Área no encontrada", areaId);
        response.status = 404;
        response.message = {
          "message" : "área no encontrada " + areaId
        };
      }
      if(area){

        area.deletedAt = '';

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
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

module.exports.areasDeleteOne = function(req, res){
  var areaId = req.params.areaId;

  console.log("GET the area ID and delete", areaId);

  Area
    .findById(areaId)
    .select('deletedAt')
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc
      };

      if(err){
        console.log("Error finding area");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message" : "Área buscada no encontrad"
        };
      }
      if(response.status !== 200){
        res
          .status(response.status)
          .json(response.message);
      } else {
        console.log("Area before:", doc);
        doc.deletedAt = Date.now();
        console.log("Area after:", doc);
        doc.save(function(err, areaUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json(doc);
          }
        });
      }
    });
};

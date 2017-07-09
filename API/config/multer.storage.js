varl multer = require('multer');
//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

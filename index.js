var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', function (req, res) {
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  upload.single('upfile')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileInfo = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.json(fileInfo);
  });
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

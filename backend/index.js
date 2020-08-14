if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const cors = require('cors')

//Initializations
const app = express()
require('./database');

//Settings
app.set('port', process.env.PORT || 4000);

//Middelwares
app.use(morgan('dev'));
app.use(cors());
//guardo imagen con nombre de fecha concadenada la extencion
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use('/api/books',require('./routes/books'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'))
})
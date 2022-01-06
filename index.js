const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
require('./src/database/database');

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.json());
app.use(express.urlencoded({urlencoded:false}));
app.use(cors());
app.use(morgan('dev'));
app.use(session({
    secret:"videoback!@@$@#",
    resave: false,
    saveUninitialized: true
}));

app.set('port', port);

// Routes
app.use('/api', require('./src/routes/api'));

app.get('*', (req, res)=>{
    res.sendFile(path.join('src', 'public', 'index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(`http://localhost:${app.get('port')}/`);
});
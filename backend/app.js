const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser=require('cookie-parser');

// Configurazione EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
    const name= req.cookies.name; //legge il cookie chiamato name
    if(name){
        //controlliamo se il cookie name esiste
        res.render('greet',{message:'Ciao',name:name});
    } else{
        res.render('form'); //mostra il form se il cookie non esiste
    }
    }
);

app.post('/greet', (req, res) => {
    const name = req.body.name;
    res.cookie('name',name,{maxAge:24 * 60 * 60 * 1000  })
    res.render('greet', {message:'Benvenuto', name: name });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
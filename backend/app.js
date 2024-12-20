const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser=require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Configurazione EJS
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('form');
});

app.get('/greet', (req, res) => {
    const name = req.cookies.name; // Legge il cookie "name"
    if (name) {
        // Se il cookie esiste, mostra la pagina di saluto
        res.render('greet', { message:'Bentornato', name: name });
    } else {
        // Se non esiste, mostra il form
        res.render('form');
    }
});

app.post('/greet', (req, res) => {
    const name = req.body.name;
    // Imposta un cookie chiamato "name" con valore l'input dell'utente
    res.cookie('name', name, { maxAge: 24 * 60 * 60 * 1000 }); 
    res.render('greet', { message:'Benvenuto', name: name });
});
app.post('/logout',(req,res) => {
    res.clearCookie('name');
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
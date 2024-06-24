const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const db = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 8080;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.get('/modal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'modal.html'));
});

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', transactionRoutes);
app.use('/', userRoutes);

db.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados');
        return db.sync({ force: false });
    })
    .then(async () => {
        console.log('Modelos sincronizados com sucesso');

        app.get('/', (req, res) => {
            res.redirect('/login');
        });
        
        app.use(express.static('public'));

        app.listen(PORT, function() {
            console.log('Hospedado na porta ' + PORT);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados ou sincronizar modelos:', err);
    });
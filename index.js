// index.js

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Definir view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Exemplo de variável de controle de autenticação
// Suponha que você tenha uma lógica para verificar se o usuário está autenticado
const loggedIn = false; // Aqui você define se o usuário está autenticado ou não

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { loggedIn }); // Passando loggedIn para o template
});

// Rota para atualização de perfil
app.get('/profile', (req, res) => {
    if (!loggedIn) {
        // Se o usuário não estiver autenticado, redirecione para a página de login
        res.redirect('/auth/login');
    } else {
        // Aqui você pode renderizar o formulário de atualização de perfil
        res.render('update-profile');
    }
});

// Rotas de autenticação
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

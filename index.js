// index.js

const express = require('express'); // Express
const mustacheExpress = require('mustache-express') // Mustache
const session = require('express-session') // Express Session

const mongoose = require('mongoose'); // Database

const authRoutes = require('./src/routes/authRoutes'); // Authentication Routes
const productRoutes = require('./src/routes/productRoutes'); // Product Routes

const app = express();
const PORT = 3000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Definir view engine
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));



//const cookieParser = require('cookie-parser');
//const path = require('path');
//const methodOverride = require('method-override');



// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));

// Exemplo de variável de controle de autenticação
// Suponha que você tenha uma lógica para verificar se o usuário está autenticado
//const loggedIn = false; // Aqui você define se o usuário está autenticado ou não

// // Rota principal
// app.get('/', (req, res) => {
//     res.render('login', { loggedIn }); // Passando loggedIn para o template
// });

// // Rota para atualização de perfil
// app.get('/profile', (req, res) => {
//     if (!loggedIn) {
//         // Se o usuário não estiver autenticado, redirecione para a página de login
//         res.redirect('/auth/login');
//     } else {
//         // Aqui você pode renderizar o formulário de atualização de perfil
//         res.render('update-profile');
//     }
// });

// // Rotas de autenticação
// app.use('/auth', authRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

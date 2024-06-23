const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getEditUser = (req, res) => {
    res.render('updateProfile', { user: req.user, errors: null });
};

exports.postEditUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updateData = { name, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        await User.update(updateData, { where: { id: req.user.id } });
        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        const errors = error.errors ? error.errors.map(err => err.message) : ['Erro ao atualizar usuário'];
        res.render('updateProfile', { user: req.user, errors });
    }
};
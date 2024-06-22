const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // Alterado de allowNull para required
        unique: false,
    },
    secondName: {
        type: String,
        required: false, // Alterado de allowNull para required
        unique: false,
    },
    email: {
        type: String,
        required: true, // Alterado de allowNull para required
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true, // Alterado de allowNull para required
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create a User in Mongoose Database
const User = mongoose.model('User', userSchema);

module.exports = User;

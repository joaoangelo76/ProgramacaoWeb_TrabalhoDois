const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const userSchema = new mongoose.Schema({
    firstname: String, // First name
    secondName: String, // Second Name
    email: { type: String, unique: true }, // Unique Email
    password: String // Account Password
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

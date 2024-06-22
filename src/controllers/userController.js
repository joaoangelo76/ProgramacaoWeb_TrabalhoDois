const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { firstName, secondName, email, password } = req.body;
        const user = new User({ firstName, secondName, email, password });
        await user.save();
        res.redirect('/login');
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// exports.listUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
//         if (!updatedUser) {
//             return res.status(404).send('User not found');
//         }
//         res.json(updatedUser);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).send('User not found');
//         }
//         res.send('User deleted successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };

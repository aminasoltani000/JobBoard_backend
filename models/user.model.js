const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true //INTERDIS LES DOUBLONS DANS BD DEUX UTULISATEUR PEUVENT PAS AVOIR LE MEME EMAIL
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);
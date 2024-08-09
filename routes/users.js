// Require Mongoose
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Change 'mydatabase' to your database name

// Users model

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String 
    },
    boards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Board',
        default: []
    }
});

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);




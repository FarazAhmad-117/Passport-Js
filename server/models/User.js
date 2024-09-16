const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.isOAuthUser; // Password is required only if not an OAuth user
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,  // Used for OAuth users
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true,
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    appleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isOAuthUser: {
        type: Boolean,
        default: false,  // Indicates if the user was created via OAuth (Google, Facebook, etc.)
    },
    avatar: {
        type: String, // URL of the user's profile picture (optional)
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it is new or modified
    if (this.isModified('password') && !this.isOAuthUser) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Method to check if the entered password is correct
userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.isOAuthUser) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
    return false; // No password for OAuth users
};

const User = mongoose.model('User', userSchema);

module.exports = User;

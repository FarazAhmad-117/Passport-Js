const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // Assuming you have a User model
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // Log the profile to see what's inside
            // console.log("Google Profile:", profile);

            // Check if user already exists in the database
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // Create a new user if not found
                user = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value, // Assuming Google sends an email
                    avatar: profile.photos[0].value, // Profile picture
                    isOAuthUser: true,  // Flag this user as an OAuth user
                    password: null  // No password for OAuth users
                });

                // Save the new user to the database
                await user.save();
            }

            // Pass the user to the `done` callback
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
));

// Serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user); // Store the user's id in the session
});

// Deserialize the user from the session
passport.deserializeUser(async function (user, done) {
    try {
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

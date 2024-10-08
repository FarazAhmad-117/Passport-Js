require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport")



router.get("/login/success", (req, res) => {   // When we get logged in by google oAuth then checking this route
    console.log(req.user)
    if (req.user) {
        return res.status(200).json({ success: true, message: "successful", user: req.user })
    }
    return res.status(403).json({ success: false, message: "unsuccessful", user: null })
});


router.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
});


router.get("/login/failed", (req, res) => {
    res.status(401).json({ success: false, message: "faliure" })
});

router.get("/google", passport.authenticate('google', { scope: ["profile", "email"] }))

router.get("/google/callback", passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed'
}))



// GITHUB ROUTES;
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.CLIENT_URL);
    }
);






module.exports = router;

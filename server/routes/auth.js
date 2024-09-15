require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport")



router.get("/login/success", (req, res) => {   // When we get logged in by google oAuth then checking this route
    console.log(req.user)
    if (req.user) {
        res.status(200).json({ success: true, message: "successful", user: req.user })
    }
    return res.status(403).json({ success: false, message: "unsuccessful", user: null })
});


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});


router.get("/login/failed", (req, res) => {
    res.status(401).json({ success: false, message: "faliure" })
});

router.get("/google", passport.authenticate('google', { scope: ["profile", "email"] }))

router.get("/google/callback", passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed'
}))




module.exports = router;

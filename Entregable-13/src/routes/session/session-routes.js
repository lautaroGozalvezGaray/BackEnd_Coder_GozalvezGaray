const {Router} = require("express");
const passport = require('passport')
const { sessionLogout, sessionLogin, sessionProducts, sessionLoginPost} = require("../../controllers/session/session-controllers");

const router = Router();


router.get("/logout", sessionLogout)

router.get("/login", sessionLogin)

router.post("/loginuser", passport.authenticate('login', {
    successRedirect: './partials/form.hbs',
    failureRedirect: './partials/login.hbs',
}))

router.post("/products", sessionProducts)

module.exports=router;
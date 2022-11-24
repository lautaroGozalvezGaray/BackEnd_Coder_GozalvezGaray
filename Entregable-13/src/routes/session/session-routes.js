const {Router} = require("express");
const passport = require('passport')
const { sessionLogout, sessionLogin, sessionProducts, sessionLoginPost} = require("../../controllers/session/session-controllers");

const router = Router();


//____________________________________________ login _____________________________________ //
router.get('/login', (req, res) => {
    res.render('./partials/login')
})

router.get('/errorLogin', (req, res) => {
    res.render('./partials/errorLogin')
})

router.get('/form', (req, res) => {
    user= req.session.username
    res.render('./partials/form', {user})
})

router.post('/login', passport.authenticate('login',{
    
    successRedirect: '/api/session/form',
    failureRedirect: '/api/session/errorLogin',

}))

//____________________________________________ register _____________________________________ //

router.get('/register', (req, res) => {
    res.render('./partials/register')
})
router.get('/errorRegister', (req, res) => {
    res.render('./partials/errorSignUp')
})
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/api/session/login',
    failureRedirect: '/api/session/errorRegister',
}))
//____________________________________________ logout _____________________________________ //

router.get('/logout', (req, res) => {
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.redirect('/api/session/login')
    })
})
module.exports=router;
const {Router} = require("express");
const passport = require('passport');
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = Router();


//____________________________________________ login _____________________________________ //
router.get('/login', (req, res) => {
    res.render('./partials/login')
})

router.get('/errorLogin', (req, res) => {
    res.render('./partials/errorLogin')
})

router.get('/form', authMiddleware,(req, res) => {
    user= req.session.user
    res.render('./partials/form', {user})
})

router.post('/login', passport.authenticate('login',{ 
    failureRedirect: '/api/session/errorLogin',}),
    (req, res) => {
    const {username} = req.body
    req.session.user = username;
    res.redirect('/api/session/form')
})

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
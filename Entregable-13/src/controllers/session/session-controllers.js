const passport = require('passport')


const sessionGet = async(req, res)=>{
    try {
        user=req.session.user
        res.render("./partials/form.hbs", {user});
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
    
}

const sessionLogout = async(req, res)=>{
    try {
        req.session.destroy(err =>{
            if(err) return res.send(err)
            //res.send("session closed")
            res.redirect("/session")
         });
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
    
}

const sessionLogin = async (req, res)=>{
   res.render("./partials/login.hbs", {});
}

const sessionLoginPost = () => {
    passport.authenticate('login', {
        successRedirect: './partials/form.hbs',
        failureRedirect: './partials/login.hbs',
    })
}

const sessionProducts = async(req, res)=>{
    try {
        const {body} = req;
        await products.save(body);
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success:false
        })
    }
}

module.exports = {sessionGet, sessionLogout, sessionLogin, sessionProducts, sessionLoginPost};
const passport = require('passport')

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



module.exports = {sessionLogout, sessionLogin};
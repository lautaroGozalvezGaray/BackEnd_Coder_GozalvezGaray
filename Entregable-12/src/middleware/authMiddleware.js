const authMiddleware = (req, res, next)=>{
    if(!req.session?.user || !req.session?.admin){
        res.render("./partials/login.hbs", {});
        
    }
    //next()
}

module.exports={authMiddleware};
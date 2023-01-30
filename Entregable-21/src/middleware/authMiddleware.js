const authMiddleware = (req, res, next)=>{
    if(!req.session?.user){
        res.redirect("/api/session/login"); 
    }
    next()   
}

module.exports={authMiddleware};
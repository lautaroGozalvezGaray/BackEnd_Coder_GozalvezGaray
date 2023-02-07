const express = require("express");
const getInfoAccount = require("../../controllers/infoAccount/infoAccount-controller");

const routerinfoAccount = express.Router();

//MUESTRA TODA LA INFORMACION DEL USUARIO DE LA CUENTA
routerinfoAccount.get("/infoAccount", getInfoAccount, (req, res)=>{
    const name = req.session.name;
    const adress = req.session.adress;
    const age = req.session.age;
    const phone = req.session.phone;
    const avatar = req.session.avatar;

    res.render('../../views/partials/infoaccount.hbs', {userSession, name, adress, age, phone, avatar})
})



module.exports = routerinfoAccount;
const logger = require("../../utils/Log4js");

const usersDaoMongoDb = require("../../daos/users/usersDaoMongoDb");

const getInfoAccount = async() =>{
    try {
        const user = new usersDaoMongoDb();

        const userSession = req.session.user;

        const allUsers = await user.getAll();
        user = allUsers.find( user => user.username === userSession );

        req.session.name= user.name;
        req.session.adress= user.adress;
        req.session.age= user.age;
        req.session.phone = user.phone;
        req.session.avatar= user.avatar;

        newCart
          ? null
          : res.status(404).send(logger.error("The user doesnt exist"));

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }

}

module.exports = getInfoAccount;
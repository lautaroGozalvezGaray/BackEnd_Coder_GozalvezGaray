const passport = require('passport');
const User = require("../daos/users/usersDaoMongoDb.js")
const bCrypt = require('bcrypt');

const users = new User();

const LocalStrategy = require('passport-local').Strategy;

function createHash(password) {
    return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(10),
              null);
}
  

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

   
const initPassport = () => {
    passport.use('login', new LocalStrategy( async(username, password, done) => {
            
            const allUsers = await users.getAll();
            let user = allUsers.find( user => user.username === username ) 
    
            if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false);
            }        
    
            if (!isValidPassword(user, password)) {
               console.log('Invalid Password');
               return done(null, false);
            }
    
            return done(null, user);
        })
    
    )

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
        async(req, username, password, done) => {
            console.log(username);
            const allUsers = await users.getAll();
            let user = allUsers.find(u => u.username === username)
            console.log('register', users)
            
            if (user) {
                console.log('User already exists');
                return done(null, false, { message: 'User already exists' })
            }
            const { admin } = req.body
            
            const newUser = {
                id: allUsers.length + 1,
                username: username,
                password: createHash(password),
                admin
            }
            users.save(newUser);

            return done(null, newUser)        
        })    
    )
    
    // nos guarda el id del usuario en la session
    passport.serializeUser((user, done) => { 
        done(null, user.id);
    })

    passport.deserializeUser(async(id, done) => { // toma el id que esta en las sessiones 
        const allUsers = await users.getAll();
        let user = allUsers.find(user => user.id === id)
        done(null, user)
    })

}

module.exports = { initPassport }

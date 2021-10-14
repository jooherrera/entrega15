import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import passport from 'passport'
import { UserModel } from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config()

//!/* ---------------------------- Facebook Strategy --------------------------- */
import strategy from 'passport-facebook'
const FacebookStrategy = strategy.Strategy

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos'],
  scope: ['email']
}, (accessToken, refreshToken, userProfile, done) => {
  console.log(userProfile)
  const user = {
    firstName: userProfile.displayName,
    foto : userProfile.photos[0].value
  }

  console.log(user)
  return done(null, user)
}))


//!/* ----------------------------- Local Strategy ----------------------------- */
function isValidPassword(user, password) {
  return bcrypt.compareSync(password,user.password)
}

passport.use('login', new Strategy(
  (username, password, done) => {
    UserModel.findOne({ username }, (err, user) => {
      if (err) return done(err)
      if (!user) {
        console.log('Usuario no encontrado!')
        return done(null, false)
      }
      if (!isValidPassword(user, password)) {
        console.log('Invalid password')
        return done(null, false)
      }
      return done(null,user)
    })
  }
))

function createHash(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null )
}

passport.use('signup', new Strategy({
  passReqToCallback:true
}, (req, username, password, done) => {
  UserModel.findOne({ username }, (err,user) => {
    if (err) return done(err)
    if (user) {
        console.log('El usuario existe!')
        return done(null, false)
    }
    const newUser = {
      username,
      password : createHash(password),
      email:req.body.email,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    }

    UserModel.create(newUser, (err, user) => {
      if (err) return done(err)
      console.log('Usuario creado')
      return done(null, user)
    })
  })
}

))




passport.serializeUser((user, done) => {
  done(null,user)
})

passport.deserializeUser((user, done) => {
  done(null,user)
})

export default passport 
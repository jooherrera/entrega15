import express from 'express'
import passport from '../utils/passport.util.js'
import * as AuthController from '../controllers/auth.controller.js'
import * as AuthMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/login',AuthController.getLogin)
router.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}),AuthController.postLogin)
router.get('/failLogin', AuthController.getFailLogin)

router.get('/signup',AuthController.getSignup)
router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failSignup'}),AuthController.postSignup)
router.get('/failSignup', AuthController.getFailSignup)

router.get('/logout', AuthController.logout)

router.get('/protected', AuthMiddleware.checkAuthentication)





router.get('/auth/facebook',passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/failLogin'
}))




export default router
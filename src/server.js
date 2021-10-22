import express from 'express'
import emoji from 'node-emoji'
import cors from 'cors'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import path from 'path'
import session from 'express-session'
import passport from './utils/passport.util.js'
import './db.js'
import UserRouter from './routers/auth.route.js'
import minimist from 'minimist'
import * as ApiRouter from './routers/api.route.js'

// const options = {
//   default : {
//     PORT : 8080
//   }
// }

//const arg = minimist(process.argv.splice(2), options)



// import minimist from 'minimist'

// const options = {
//   default : {
//     PORT : 8080
//   }
// }
// const arg = minimist(process.argv.splice(2), options)
// console.log(arg)

// const puerto = arg.PORT

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('view engine', '.hbs')
app.use(express.static(path.resolve() + '/views'))
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge:Number(process.env.EXPIRE)
  },
  rolling: true,
  resave: true,
  saveUninitialized:true
}))





app.use(passport.initialize())
app.use(passport.session())





app.use('/',UserRouter)
app.use('/api',ApiRouter.apiRoute)




const server = app.listen(ApiRouter.puerto, () => console.log(emoji.get('fire'),`Server started on port http://localhost:${ApiRouter.puerto}`))
server.on('error', (err) => console.log(err))


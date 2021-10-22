import { Router } from "express";
// import {fork} from "child_process"
import {fork} from "child_process"
import minimist from 'minimist'

const apiRoute = Router()

const options = {
  default : {
    PORT : 8080
  }
}

const argumentos = process.argv.splice(2)
const arg = minimist(argumentos, options)
const puerto = arg.PORT



apiRoute.get('/randoms', (req,res) => {
  let { cant } = req.query
  let childProcess =  fork("random.js")
  let nCant = 0
  !cant ? nCant = 500_000_000 : nCant = cant

  childProcess.on("message",resultado =>{
    if (resultado === "listo"){
      childProcess.send(parseInt(nCant))
    }else{
      res.status(200).json(resultado)
      console.log(resultado)
    }
   })
})


apiRoute.get('/info',(req,res) => {
  console.log(arg)
  res.status(200).json({
    ArgumentosEntrada : arg,
    SistOperativo : process.platform,
    NodeVersion : process.version,
    MemoriaRSS : process.memoryUsage().rss,
    ProcesoID : process.pid,
    CarpetaProyecto : process.cwd()

  })
})



export {apiRoute , puerto}
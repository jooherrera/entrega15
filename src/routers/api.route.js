import { Router } from "express";
import {fork} from "child_process"
import {nCpus} from '../config.js'
const apiRoute = Router()

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
  res.status(200).json({
    SistOperativo : process.platform,
    NodeVersion : process.version,
    MemoriaRSS : process.memoryUsage().rss,
    ProcesoID : process.pid,
    CarpetaProyecto : process.cwd(),
    NumeroDeProcesadores : nCpus,
    PID : process.pid

  })
})



export {apiRoute}

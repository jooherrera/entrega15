process.send('listo')

process.on("message", (cant) => {
  console.log(cant)
    const resultado = RandomNumber(cant)
    process.send(resultado)
})

function RandomNumber(nCant){
  let Aleatorios = {}
  console.log("Random",nCant)
  for (let index = 0; index < nCant; index++) {
        let numAleatorio = Math.floor(Math.random() * (1001 - 1 ) + 1)   
        if(Aleatorios[numAleatorio]){
          Aleatorios[numAleatorio]++
        }else{
          Aleatorios[numAleatorio] = 1
        }
    }
  return Aleatorios
}



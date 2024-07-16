const API_KEY = '861310b1ce57322d5bbad9c50a8c869b'

const IDiconeTemperatura = document.getElementById('fundoClima')
const IDtemperatura = document.getElementById('temperatura')
const IDlocalidade = document.getElementById('localidade')
const IDumidade = document.getElementById('umidade')
const IDventos = document.getElementById('ventos')
const IDcard = document.querySelector('.PrevisaoDoTempo')


function getData(local) {
  const route = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${API_KEY}`
  return fetch(route).then(response => response.json())
}

function carregarInformacoes() {
  const valorDigitado = document.querySelector('[name="local"]').value 
 
  getData(valorDigitado).then(data => {

    if(data.cod === '404') {
      IDcard.classList.remove('ativa')
      return
    }
    IDcard.classList.add('ativa')

    IDtemperatura.innerHTML = Math.floor(data.main.temp) + '°C'
    IDlocalidade.innerHTML = data.name 
    IDumidade.innerHTML = data.main.humidity +  '%'
    IDventos.innerHTML = Math.floor(data.wind.speed) + 'Km/h'

    const iconeClima = data.weather[0].main.toLocaleLowerCase()
    const src = `./assets/icons/${iconeClima}.png`
    IDiconeTemperatura.setAttribute('src', src)

    fadeIn()
  })
}


function enviarDados(evento) {
  evento.preventDefault()

  fadeOut()
 
}

function fadeIn() {
  const timeLine = gsap.timeline()
  const configuraçãoFrom = { y: -51}
  const configuraçãoTo = { y: 0, duration: 0.4, opacity: 1, ease: 'back'}

  timeLine.fromTo('#fundoClima', configuraçãoFrom , configuraçãoTo)
  timeLine.fromTo('#temperatura', configuraçãoFrom , configuraçãoTo, 0.1)
  timeLine.fromTo('#localidade', configuraçãoFrom , configuraçãoTo, 0.2)
  timeLine.fromTo('footer', configuraçãoFrom , configuraçãoTo, 0.3)
}

function fadeOut() {
  const timeLine = gsap.timeline({onComplete: carregarInformacoes})
  const configuraçãoOut = { y:51, duration: 0.4, opacity: 0, ease: 'slow' }

  timeLine.to('footer', configuraçãoOut)
  timeLine.to('#localidade', configuraçãoOut, 0.1)
  timeLine.to('#temperatura', configuraçãoOut, 0.2)
  timeLine.to('#fundoClima', configuraçãoOut, 0.2)
}



document.querySelector('form').addEventListener('submit', enviarDados)

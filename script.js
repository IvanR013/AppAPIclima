let apik = '08ef9b1bb661852d55e88804583e8dd9'
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let kelvinDelta = 273.15
let input = document.getElementById('botonBusqueda')
let boton = document.getElementById('botonBusqueda')

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) {
        fetchDatosClima(ciudad)

    }
})


function fetchDatosClima(ciudad) {

    fetch(`${urlBase}?q=${ciudad}&appid=${apik}`)
        .then(data => data.json())
        .then(data => mostrarDatosClima(data))
      


}

function mostrarDatosClima(data) {  
    //  esta func se encarga de agregar la info que nos dé el API dentro del div datosclima
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''
    const ciudadNombre = data.name
    const nombrePais = data.sys.country
    const temperatura = data.main.temp                   //estás variables dicen de dónde viene el dato que buscamos
    const descripcion = data.weather[0].description
    const humedad = data.main.humidity
    const presion = data.main.pressure
    const icono = data.weather[0].icon

    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${nombrePais}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - kelvinDelta)}°C`   //Estas otras cómo queremos que se vean en el html y el orden en el que aparecen.

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `Humedad: ${humedad}%.`  //humedad

    const presionInfo = document.createElement('p') 
    presionInfo.textContent = `La presión es de: ${presion}Bar.` //presion

    const iconoInfo = document.createElement('img')
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png` //ícono

    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La jornada de hoy será: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo) //Estas líneas meten esos datos en el div "datosclima" sin escribir en el HTML.
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(presionInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)

}



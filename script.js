let apik = '08ef9b1bb661852d55e88804583e8dd9';
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let kelvinDelta = 273.15;
let input = document.getElementById('botonBusqueda');
let boton = document.getElementById('botonBusqueda');

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) {

        fetchDatosClima(ciudad)

    }
});


async function fetchDatosClima(ciudad) {

    const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apik}`)
        .then(data => data.json())
        .then(data => mostrarDatosClima(data))
      
        

}



function mostrarDatosClima(data) {  
    //  esta func se encarga de agregar la info que nos dé el API dentro del div datosclima
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';
    const ciudadNombre = data.name;
    const nombrePais = data.sys.country;
    const temperatura = data.main.temp; //estás variables dicen de dónde viene el dato que buscamos
    const descripcion = data.weather[0].description;
    const humedad = data.main.humidity;
    const presion = data.main.pressure;
    const icono = data.weather[0].icon;
    cambiarFondoClima(descripcion);

//Objeto de traducción para poder traducir las descripciones de la API
const translations = {
    "clear sky": "cielo despejado, Lindo Día.",
    "few clouds": "Parcialmente nublado",
    "scattered clouds": "Alguna nube",
    "broken clouds": "nubes esacasas",
    "shower rain": "lluvia ligera",
    "rain": "lluvia",
    "thunderstorm": "Se cae el cielo",
    "snow": "nieve",
    "mist": "neblina",
    "overcast clouds": "Nublado",
    "light rain": "Lluvia ligera",
    "moderate rain": "Lluvia moderada",
    "heavy intensity rain": "Lluvia intensa",
    "light snow": "Nieve ligera"
};

//Función de fotos dinámicas según el clima que salga
function cambiarFondoClima(descripcion) {
    const body = document.body;
    const fondoClima = {
        "clear sky": "url('Assets/clear sky.jpeg')",
        "few clouds": "url('/Assets/few clouds.jpg')",
        "scattered clouds": "url('/Assets/few clouds.jpg')",
        "broken clouds": "url('/Assets/few clouds.jpg')",
        "shower rain": "url('Assets/rain.jpg')",
        "rain": "url('Assets/rain.jpg')",
        "light rain": "url('Assets/rain.jpg')",
        "moderate rain": "url('Assets/rain.jpg')",
        "heavy intensity rain": "url('Assets/rain.jpg')",
        "thunderstorm": "url('Assets/rain.jpg')",
        "snow": "url('Assets/snow.jpg')",
        "light snow": "url('Assets/snow.jpg')",
        "mist": "url('Assets/mist.jpeg')",
        "overcast clouds": "url('Assets/overcast clouds.jpg')"
    };

    // Cambiar el fondo suavemente
    body.style.transition = "background-image 0.5s ease-in-out";
    body.style.backgroundImage = fondoClima[descripcion] || "url('Assets/PortFondoapiClima.jpg')";
    body.style.backgroundSize = "cover";
}



    const descripcionTraducida = translations[descripcion] || descripcion;


    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${nombrePais}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - kelvinDelta)}°C`;   //Estas otras cómo queremos que se vean en el html y el orden en el que aparecen.

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `Humedad: ${humedad}%.`;  //humedad

    const presionInfo = document.createElement('p'); 
    presionInfo.textContent = `La presión es de: ${presion}Bar.`; //presion

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`; //ícono

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `El día va a estar: ${descripcionTraducida}`;

    divDatosClima.appendChild(ciudadTitulo);
    divDatosClima.appendChild(temperaturaInfo); //Estas líneas meten esos datos en el div "datosclima" sin escribir en el HTML.
    divDatosClima.appendChild(humedadInfo);
    divDatosClima.appendChild(presionInfo);
    divDatosClima.appendChild(iconoInfo);
    divDatosClima.appendChild(descripcionInfo);

}



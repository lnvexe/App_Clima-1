const api = {
    key: "927dd8bb728bd460eb3af344bacc75cf",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const buscador = document.querySelector('.buscador');
buscador.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        Resultado(buscador.value);
    }
}

function Resultado(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(mostrarResultados);
}

function mostrarResultados(weather) {
    console.log(weather);
    let ciudad = document.querySelector('.ubicacion .ciudad');
    ciudad.innerText = `${weather.name}, ${weather.sys.country}`;

    let fechaActual = new Date();
    let fecha = document.querySelector('.ubicacion .fecha');
    fecha.innerText = armarFecha(fechaActual);

    let temperatura = document.querySelector('.actual .temperatura');
    temperatura.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let imagen = document.getElementsByTagName('body')[0];
    let clima = document.querySelector('.actual .clima');
    switch (weather.weather[0].main) {
        case "Clouds":
            clima.innerText = "Nublado";
            imagen.style.backgroundImage = "url('https://images.pexels.com/photos/3941855/pexels-photo-3941855.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
            break;
        case "Clear":
            clima.innerText = "Despejado";
            imagen.style.backgroundImage = "url('https://images.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
            break;
        case "Rain":
            clima.innerText = "LLuvioso";
            imagen.style.backgroundImage = "url('https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')";
            break;
        default:
            clima.innerText = "---";
            break;
    }

    let minmax = document.querySelector('.actual .min-max');
  minmax.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function armarFecha(d) {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
    let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let dia = dias[d.getDay()];
    let fecha = d.getDate();
    let mes = meses[d.getMonth()];
    let año = d.getFullYear();

    return `${dia} ${fecha} de ${mes} de ${año}`;
}
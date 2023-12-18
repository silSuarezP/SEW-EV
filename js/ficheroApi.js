var c = "";


class Geolocalizacion {
    constructor(lat, long) {
        this.latitud = lat;
        this.longitud = long;
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.mostrarErrores.bind(this));
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
    }

    mostrarErrores(error) {
        switch (error.code) {
            case error.POSITION_UNAVAILABLE:
                this.aux = "Oh oh! La posición no está disponible"
                break;
            case error.UNKNOWN_ERROR:
                this.aux = "Vaya! Se ha producido un error desconocido"
                break;
            case error.PERMISSION_DENIED:
                this.aux = "Error: No se han dado permisos de localización"
                break;
            case error.TIMEOUT:
                this.aux = "Vaya! La peticion ha caducado"
                break;
        }
    }

    mostrarMapa() {
        var centro = { lat: 40.423757738011936, lng: -3.704951555671984 };
        var mapa = new google.maps.Map(document.querySelector('section'), { zoom: 3, center: centro });

        var aux = c.split("||");
        for (var i = 0; i < aux.length; i++) {
            var aux2 = aux[i].split(",");
            var la = aux2[0];
            var lo = aux2[1];

            console.log(la + "," + lo);

            var lugar = { lat: Number(la), lng: Number(lo) };
            var marcador = new google.maps.Marker({ position: lugar, map: mapa });
        }
        var lugar = { lat: Number(this.latitud), lng: Number(this.longitud) };
        var marcador = new google.maps.Marker({
            position: lugar, map: mapa, title: "Estás aquí",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });

        $("article").remove();
    }

    mostrarMiUbicacion() {
        var centro = { lat: this.latitud, lng: this.longitud };
        var mapa = new google.maps.Map(document.querySelector('section'), { zoom: 8, center: centro });

        var lugar = { lat: Number(this.latitud), lng: Number(this.longitud) };
        var marcador = new google.maps.Marker({
            position: lugar, map: mapa, title: "Estás aquí",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });

        $("article").remove();
    }

    mapaPantallaCompleta() {
        this.pantallaCompleta(document.querySelector("section"));
    }

    pantallaCompleta(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

var geo = new Geolocalizacion(43.36029, -5.84476);









class Tiempo {

    constructor() {
        this.apikey = "64e2e6b06537bc7c1eab8dc4db8b1e64"; // 87dc382bb3c0f273fac61c080c75e1ce
        this.ciudad = ['Oviedo', 'Avilés', 'Gijón', 'Cangas de Onís', 'Llanes', 'Mieres'];
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.codigoPais = "ES";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.error = "<h2>¡problemas! No puedo obtener información de <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";

        this.latitud = 0;
        this.longitud = 0;
    }

    getURLCiudad(ciudad) {
        return "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }

    cargarDatos() {
        for (var i = 0; i < this.ciudad.length; i++) {
            this.mostrarDatos(this.ciudad[i]);
        }
    }

    mostrarDatos(ciudad) {
        $.ajax({
            dataType: "json",
            url: this.getURLCiudad(ciudad),
            method: 'GET',
            success: function (datos) {
                $("pre").text(JSON.stringify(datos, null, 2));

                var st = "<ul><li>Ciudad: " + datos.name + "</li>";
                st += "<li>País: " + datos.sys.country + "</li>";
                st += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                st += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                st += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                st += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius<</li>";
                st += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                st += "<li>Presión: " + datos.main.pressure + " milímetros</li>";
                st += "<li>Humedad: " + datos.main.humidity + "%</li>";
                st += "<li>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</li>";
                st += "<li>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</li>";
                st += "<li>Dirección del viento: " + datos.wind.deg + "  grados</li>";
                st += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                st += "<li>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</li>";
                st += "<li>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</li>";
                st += "<li>Descripción: " + datos.weather[0].description + "</li>";
                st += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                st += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                st += "<img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\" alt=\"Imagen del tiempo\" />";


                this.latitud = Number(datos.coord.lat);
                this.longitud = Number(datos.coord.lon);

                c += this.latitud + "," + this.longitud + "||";

                this.geo = new Geolocalizacion(datos.coord.lat, datos.coord.lon);

                $("h3").hide();
                $("h2").after(st);

            }, error: function () {
                $("h3").html("Error. No se ha podido obtener el JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
            }
        });
    }

    getLatitud() {
        return this.latitud;
    }

    getLongitud() {
        return this.longitud;
    }
}


var tiempo = new Tiempo();




class ProcesadorKML {
    constructor() {
        this.archivos = new Array();
    }

    cargarArchivos(files) {
        var file = files[0];

        this.procesar(file);
    }

    procesar(archivo) {
        var reader;
        var coords = new Array();
        var marcador = "";
        var lineaCoordenadas = 6;

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();

            reader.onload = function (event) {
                var aux = reader.result.split("\n");
                var cords = "";
                for (var i = 1; i < aux.length; i++) {
                    if ((i % lineaCoordenadas) === 0) {
                        var coordenadas = aux[i].split("<coordinates>")[1].split(" ");
                        cords += coordenadas[0].trim() + ",";
                        cords += coordenadas[1].trim() + " || ";
                    }
                }

                var centro = { lat: 43.36436500087751, lng: -5.847628499119225 };
                var mapa = new google.maps.Map(document.querySelector('main'), { zoom: 8, center: centro });

                for (var i = 1; i < cords.split(" || ").length - 1; i++) {
                    this.lat = cords.split(" || ")[i].split(",")[1];
                    this.long = cords.split(" || ")[i].split(",")[0];

                    var lugar = { lat: Number(this.lat), lng: Number(this.long) };
                    var marcador = new google.maps.Marker({ position: lugar, map: mapa });
                }
            }

            reader.readAsText(archivo);

        } else
            document.write("<p>Oh no! Este navegador no soporta API File</p>");
    }
}


var pKML = new ProcesadorKML();









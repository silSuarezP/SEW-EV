/** 
 * 1. manejo de errores de geolocalización
 * 2. creación de un mapa estático
 * 3. creación de un mapa dinámico
 */


class Viajes {
    
    /////////////////////////////////////// MAPA ESTÁTICO ////////////////////////////////////////////////////
    //  api key google maps AIzaSyB_VTPfMRljUs0W9lJzBQpMt3VyepKDdYo 
    constructor() {
        // generación de mapas
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.mostrarErrores.bind(this));


        
        // procesamiento xml
        this.nFiles = 0;
        this.fileArray;
        this.totalBytes = 0;



        // procesamiento de kml
        this.archivos = new Array();
    }

    getPosicion(posicion) {
        this.aux = "";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
    }

    mostrarInfo() {
        var datos = "<article>";
        datos += "<h3> Información: </h3>";
        datos += "<p>" + this.aux + "</p>";
        datos += '<p>Longitud: ' + this.longitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Precisión de la longitud y latitud: ' + this.precision + ' metros</p>';
        datos += '<p>Altitud: ' + this.altitude + ' metros</p>';
        datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';
        datos += "</article>";

        $("input[data-element='xml']").after(datos);

        this.mostrarMapaEstatico();
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

    mostrarMapaEstatico() {
        // mi key = AIzaSyB_VTPfMRljUs0W9lJzBQpMt3VyepKDdYo
        var apiKey = "&key=AIzaSyB_VTPfMRljUs0W9lJzBQpMt3VyepKDdYo";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=900x700";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";

        this.url = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        $('img').remove();
        $('p:last').after("<img src='" + this.url + "' alt='mapa'/>");
    }






    /////////////////////////////////////// MAPA DINÁMICO ////////////////////////////////////////////////////
    initMap() {
        var lugar = { lat: 43.558611, lng: -6.071667 };
        var mapa = new google.maps.Map(document.querySelector('main'), { zoom: 8, center: lugar });
        var marcador = new google.maps.Marker({ position: lugar, map: mapa });
    }






    /////////////////////////////////////// ARCHIVOS XML ////////////////////////////////////////////////////
    checkearApiFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            alert("Aviso: este navegador no soporta la subida de archivos");
            return;
        }
    }


    informacionArchivos() {
        this.totalBytes = 0;
        this.fileArray = document.querySelector('input[data-element="xml"]').files;
        this.nFiles = this.fileArray.length;


        var tit2 = "<h4>Información sobre los archivos:</h4>"
        for (var i = 0; i < this.nFiles; i++) {
            this.totalBytes += this.fileArray[i].size;
        }
        var infoBasica = "";
        for (var i = 0; i < this.nFiles; i++) {
            infoBasica += "<p>Archivo [" + i + "] = " + this.fileArray[i].name + " Tipo: " + this.fileArray[i].type + "</p>";
        }

        $('section').append("" + tit2 + " <p>Total de bytes: " + this.totalBytes + "<p>" + infoBasica);

        this.mostrarContenidoArchivos();
    }

    mostrarContenidoArchivos() {
        var file;

        $('section').append("<h4>Contenido de los archivos:</h4>");
        for (var i = 0; i < this.nFiles; i++) {
            file = this.fileArray[i];

            console.log(this.fileArray[i]);

            this.leerArchivo(file);
        }
    }


    leerArchivo(file) {
        var string = "<h3>" + file.name + "</h3>"
        var lector;
        var regexJson = "application/json";
        var regexTxt = "text/plain";
        var regexxml = "text/xml";

        $('input').after("<section>" + string);

        if (file.type === regexJson || file.type === regexTxt || file.type === regexxml) {
            lector = new FileReader();

            lector.onload = function (evento) {
                $("h4:last").after("<p name=\"" + file.name + "\"></p>");

                $("p:last").after("<pre>");
                document.querySelector("section>pre").innerText = lector.result;

                $('p:last').after("</pre>");

                $("br").replaceWith("\n");
            }

            $('section>p:last').after("</section>");
            lector.readAsText(file);
            $('h3:first-child').remove();

        } else {
            string = "<p>Imposible leer archivo, formato no permitido.</p></section>";
        }
    }







    /////////////////////////////////////// ARCHIVOS KML ////////////////////////////////////////////////////
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





    /////////////////////////////////////// PHP ////////////////////////////////////////////////////
    nextPhoto() {
        console.log("next pulsao");
        let photos = document.querySelectorAll("img[data-element='cImg']");
        let lastPhoto = photos.length - 1;
        if (this.currentPhoto != lastPhoto) {
            this.currentPhoto++;
        } else {
            this.currentPhoto = 0;
        }
        photos.forEach((photo, index) => {
            var disp = index - this.currentPhoto;
            var disp = 100 * disp;

           $(photo).css('transform', `translateX(${disp}%)`);
        });
    }

    previousPhoto() {
        console.log("previous pulsao");
        let photos = document.querySelectorAll("img[data-element='cImg']");
        let lastPhoto = photos.length - 1;
        if (this.currentPhoto != 0) {
            this.currentPhoto--;
        } else {
            this.currentPhoto = lastPhoto;
        }
        photos.forEach((photo, index) => {
            var disp = index - this.currentPhoto;
            var disp = 100 * disp;

           $(photo).css('transform', `translateX(${disp}%)`);
        });
    }

}

var viajes = new Viajes();

var mapaDinamicoGoogle = new Object();
mapaDinamicoGoogle.initMap = viajes.initMap;

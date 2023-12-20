<?php
    class Carrusel {
        public string $capital = "";
        public string $country = "";

        public function __construct($capitalName, $countryName) {
            $this->capital = $capitalName;
            $this->country = $countryName;
        }

        function getCarrusel() {
            $api_key = 'f0bd1ed7583f39d2166977e5e920e3c3';
            $tags = $this->country . "," . $this->capital;
            $pp = 10;
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?&api_key=' . $api_key.'&tags=' . $tags.'&per_page=' . $pp . '&format=json&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            $html = "<article data-element='carrusel'>";
            $html .= "<h3>Carrusel de imágenes</h3>";

            for($index = 0; $index < $pp; $index++) {

                $urlPhoto = str_replace("_m.jpg", "_b.jpg", $json->items[$index]->media->m);

                $imgHTML = "<img data-element='carruselImg' alt='Foto [" . $index . "] de Nauru' src='".$urlPhoto."' />";

                $html .= $imgHTML;
            }

            $html .= "<button onclick='viajes.nextPhoto()' data-action='next'>";
            $html .= "</button>";
            $html .= "<button data-action='prev' onclick='viajes.previousPhoto()'>" ;
            $html .= "</button>";
            $html .= "</article>";
            return $html;
        }
    }

    class Moneda {
        public string $monedaPropia = "ALL";
        public string $monedaCambio = "EUR";
        private string $app_id = "15798ae3eba24c5bbfe6c3352288b483";

        public function __construct($moneda, $cambio) {
            $this->monedaPropia = $moneda;
            $this->monedaCambio = $cambio;
        }

        public function consultaCambio() {
            // no se puede cambiar la base (USD) porque se necesita suscripcion. Cojo las dos monedas y con factores de conversión consigo el equivalente a 1€ lek albanés
            $url = "https://openexchangerates.org/api/latest.json?app_id=" . $this->app_id . "&symbols=" . $this->monedaCambio . "," . $this->monedaPropia;
            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);
            $ALL = $json->rates->ALL;
            $EUR = $json->rates->EUR;
            $equivalencia = round($ALL/$EUR, 3);
            $resultado = "<p>1€=" . $equivalencia . " Leks albaneses</p>";
            return $resultado;
        }
    }
?>

















<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Silvia Suárez Prendes" />
    <meta name="description" content="Viajes" />
    <meta name="keywords" content="Viajes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Viajes</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


    <link rel="icon" href="multimedia/fotos/icono.jpg" />

    <script src="js/viajes.js"></script>

</head>

<body>
    <!-- Datos con el contenido que aparece en el navegador -->
    <header>
        <h1>Escritorio virtual</h1>
        <nav>
            <a href="index.html" accesskey="I" tabindex="1">Inicio</a>
            <a href="sobremi.html" accesskey="S" tabindex="2">Sobre mí</a>
            <a href="noticias.html" accesskey="N" tabindex="3">Noticias</a>
            <a href="agenda.html" accesskey="A" tabindex="4">Agenda</a>
            <a href="meteorologia.html" accesskey="M" tabindex="5">Meteorología</a>
            <a href="viajes.php" accesskey="V" tabindex="6">Viajes</a>
            <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
            <a href="ficheroApi.html" accesskey="M" tabindex="8">Mapa</a>
        </nav>
    </header>

    <h2>Viajes</h2>

    <main></main>
    <script>
        let viajes = new Viajes();

        <?php
        $("button[data-action='next']").on("click", viajes.next());
        $("button[data-action='prev']").on("click", viajes.previous());
        $cambio = new Moneda('ALL', 'EUR');
            echo $cambio->consultaCambio();
            $carrusel = new Carrusel('Tirana', 'Albania');
            echo $carrusel->getPhotos();
        ?>

    </script>

         
            
    <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_VTPfMRljUs0W9lJzBQpMt3VyepKDdYo&callback=mapaDinamicoGoogle.initMap">
        </script>

    <button onclick=viajes.mostrarInfo()>Mostrar mapa estático</button>

    <p>
        <label for="file">Seleccione el archivo KML para mostrar ubicaciones en el mapa</label>
        <input id="file" type="file" data-element='kml' accept=".kml" onchange="viajes.cargarArchivos(this.files)" multiple="">
    </p>


    <p>
        <label for="upload">Seleccione el archivo XML que desea procesar</label>
        <input id="upload" data-element='xml' type="file" accept=".xml" name="upload" onchange="viajes.informacionArchivos()">
    </p>

    <section>
        
    </section>


</body>

</html>
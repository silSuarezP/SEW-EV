<?php

class Record{
    private $server;
    private $user;
    private $pass;
    private $dbname;


    public string $name;
    public string $surname;
    public string $level;
    public string $time;

    
    function __construct(){
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "record";

        $this->recForm = "";
        $this->top10 = "";
    }




    function addData()
    {
        $db = new mysqli($this->server, $this->user, $this->pass);

        // Comprobar la conexion
        if ($db->connect_error) {
            die("Error de conexión: " . $db->connect_error);
        }
    
        echo "<h2>Conexión establecida</h2>";

        // Comando para insertar
        $query = $db->prepare("INSERT INTO record (nombre, apellidos, nivel, tiempo) VALUES (?,?,?,?)");

        if ($query) {
            $query->bind_param(
                'sssi', $_POST["nombre"], $_POST["apellidos"], $_POST["nivel"], $_POST["tiempo"] );
            $query->execute();

            // Printear los resultados de la inserción
            echo "<p>Filas añadidas: " . $query->affected_rows . "</p>";

            $query->close();
        }

        $db->close();

        $_SESSION['stored'] = true;
    }


    function getTopTen() {
        $db = new mysqli($this->server, $this->user, $this->pass);

        // Comprobar la conexion
        if ($db->connect_error) {
            die("Error de conexión: " . $db->connect_error);
        }
           
        $query = "SELECT * FROM record ORDER BY tiempo ASC LIMIT 10";

        if ($query) {
            $query->bind_param('s', $_POST['nivel']);
            $query->execute();

            $res->$query->get_result();


            $this->top10 = '<h3>Top 10 mejores resultados</h3>';
            $this->top10 += '<ol>';

            while($row = $res->fetch_assoc()){
                $t = sprintf('%02d:%02d:%02d', $row['tiempo']/3600, $row['tiempo']/60%60, $row['tiempo']%60);
                $this->top10 .= '<li>'. $row['nombre'] . ' ' . $row['apellidos'] . ' ' . $time . '</li>';
            }
            
            $this->top10 .= '</ol>';

            $query->close();
        }

        $db->close();
        return $top10;
    }

    function showForm($name, $surname, $level, $time) {
        $this->recForm = '<form action="#" method="post">';
        $this->recForm += '<label for="nombre">Nombre:</label>';
        $this->recForm += '<input type="text" id="nombre" name="nombre" value="' . $name . '">';
        $this->recForm += '<label for="apellidos">Apellidos:</label>';
        $this->recForm += '<input type="text" id="apellidos" name="apellidos" value="' . $surname . '">';
        $this->recForm += '<label for="nivel">Nivel:</label>';
        $this->recForm += '<input type="text" value="medio" readonly="readonly" id="nivel" name="nivel" value="' . $level . '">';
        $this->recForm += '<label for="tiempo">Duración del juego:</label>';
        $this->recForm += '<input type="text" value="1s" readonly="readonly" id="duracion" name="tiempo" value="' . $time . '">';
        $this->recForm += '<input type="submit" value="Enviar" name="completo">';
        $this->recForm += '</form>';
    }
}


    $rec = new Record();
    
    session_start();

    if (count($_POST) <= 0) {
        $rec->addData();
    } else {
        $rec->name = $_POST['nombre'];
        $rec->surname = $_POST['apellidos'];
        $rec->level = $_POST['nivel'];

        $rec->time = $_POST['tiempo'];
        $rec->time = intval($rec->time);
        
        showForm($rec->name, $rec->surname, $rec->level, $rec->time);
    }                    


    if ($_SESSION['stored']) {
        $rec->getTopTen();
        $_SESSION['stored'] = false;
    }

?>




<!DOCTYPE HTML>
<html lang="es">

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name="author" content="Silvia Suárez Prendes" />
    <meta name="description" content="Juegos" />
    <meta name="keywords" content="Juegos" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Juegos: Crucigrama</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <link rel="stylesheet" type="text/css" href="estilo/botonera.css" />

    <link rel="icon" href="multimedia/fotos/icono.jpg" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>


    <script src="js/crucigrama.js"></script>
</head>


<body>
    <header>
        <h1>Escritorio virtual</h1>
        <nav>
            <a href="index.html" accesskey="I" tabindex="1">Inicio</a>
            <a href="sobremi.html" accesskey="S" tabindex="2">Sobre mí</a>
            <a href="noticias.html" accesskey="N" tabindex="3">Noticias</a>
            <a href="agenda.html" accesskey="A" tabindex="4">Agenda</a>
            <a href="meteorologia.html" accesskey="M" tabindex="5">Meteorología</a>
            <a href="viajes.html" accesskey="V" tabindex="6">Viajes</a>
            <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
            <a href="ficheroApi.html" accesskey="M" tabindex="8">Mapa</a>
        </nav>
    </header>

    <section>
        <h2>Juegos</h2>
        <ul>
            <li><a href="memoria.html">Memoria</a></li>
            <li><a href="sudoku.html">Sudoku</a></li>
            <li><a href="crucigrama.php">Crucigrama</a></li>
        </ul>
    </section>


    <section>
        <h2>Crucigrama</h2>
    </section>


    <main>

    </main>
    <?php echo $rec->getTopTen();
            echo $rec->showForm();
        ?>

  
    <script>
        crucigrama.paintMathWord();
        document.addEventListener('keydown', function (event) {
            crucigrama.handleKeydown(event);
        });
    </script>




    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>

</body>


</html>
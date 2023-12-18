class Crucigrama {

    numCols = 9;
    numRows = 11;
    init_time;
    end_time;

    crucigrama; // variable de tipo array que contiene la representación del tablero

    CLICKED = "clicked";

    constructor() {
        this.crucigrama = new Array(this.numRows).fill(0).map(() => new Array(this.numCols).fill(0));

        // nivel fácil
        // this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        // this.level = "facil";

        // // nivel medio
        this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
        this.level = "medio";

        // // nivel difícil;
        // this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
        // this.level = "dificil";


        this.hk = this.handleKeydown.bind(this);
        this.start();
    }

    /**
     * pone valores dentro de las celdas del array bidimensional "crucigrama"
     * el valor de cada posición se debe tomar de la cadena this.BOARD que se recorre caracter a caracter
     *      - si el valor en es numérico -> vuelca el mismo número en el array
     *      - si el valor es un "." -> la celda estará vacía
     *      - si el valor es un "#" -> la celda estará deshabilitada
     */
    start() {
        let isNumber = /^[1-9]$/;

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = this.board.split(',')[i * this.numCols + j];
                let isValid = isNumber.test(v);
                if (isValid) { // la celda tendrá el mismo número del array
                    this.crucigrama[i][j] = parseInt(v);
                }
                if (v === ".") // la celda estará vacía
                    this.crucigrama[i][j] = 0;
                else if (v === "#") // la celda estará deshabilitada
                    this.crucigrama[i][j] = -1;
                else
                    this.crucigrama[i][j] = v;

            }
        }
    }

    paintMathWord() {
        let main = document.getElementsByTagName("main")[0];

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = this.crucigrama[i][j];
                let par = document.createElement("p");

                par.setAttribute("data-row", i);
                par.setAttribute("data-col", j);
                if (v === 0) {
                    par.addEventListener("click", this.clickC.bind(par, this));
                }
                else {
                    // la casilla puede ser rellenada
                    if (v === -1) {
                        par.textContent = "";
                        par.setAttribute("data-state", "empty");
                    }
                    // el número ya fue rellenado al principio
                    else if (v > 0) {
                        par.textContent = v;
                        par.setAttribute("data-state", "blocked");
                    }
                    // es un operador
                    else {
                        par.textContent = v;
                    }
                }
                main.append(par);

                this.init_time = new Date();
            }
        }
    }

    clickC(crucigrama) {
        if (crucigrama.clicked) {
            crucigrama.clicked.setAttribute("data-state", "");
        }
        this.setAttribute("data-state", crucigrama.CLICKED);
        crucigrama.clicked = this;
    }



    /**
     * comprueba si ya están rellenas todas las cuadrículas del crucigrama
     */
    check_win_condition() {
        let isComplete = true;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.crucigrama[i][j] === 0)
                    isComplete = false;
            }
        }
        return isComplete;
    }

    /**
     * realiza una cuenta con los valores de las variables init_time y end_time 
     * para obtener el tiempo total invertido en resolver el crucigrama y lo devuelve
     * como una cadena de texto
     */
    calculate_date_difference() {
        let res = this.end_time - this.init_time;

        let hours = Math.floor(res / (1000 * 60 * 60));
        let minutes = Math.floor(res / (1000 * 60)) % 60;
        let seconds = Math.floor(res / 1000) % 60;


        return hours + ":" + minutes + ":" + seconds;
    }

    introduceElement(value) {
        let r = parseInt(this.clicked.getAttribute("data-row"));
        let c = parseInt(this.clicked.getAttribute("data-col"));


        let expression_row = true;
        let expression_column = true;
        let first_number, second_number;
        let expression;
        let result;


        // si el valor es un número, introducimos el número parseado a int
        if (!isNaN(value)) {
            console.log("valor: " + value);
            this.crucigrama[r][c] = parseInt(value);
        }
        // si el valor no es un número, será un operador, introducimos su valor tal cual
        else {
            this.crucigrama[r][c] = value;

        }

        if (r < this.numRows - 1) {
            if (this.crucigrama[r + 1][c] === -1) {
                // nada
            }
            else {
                for (let i = r + 1; i < this.numRows; i++) {
                    if (this.crucigrama[i][c] === "=") {
                        first_number = this.crucigrama[i - 3][c];
                        second_number = this.crucigrama[i - 1][c];
                        expression = this.crucigrama[i - 2][c];
                        result = this.crucigrama[i + 1][c];
                        break;
                    }
                }

                if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
                    var e = [first_number, expression, second_number].join("");
                    expression_column = result == eval(e);
                }

                if (c < this.numCols - 1) {
                    if (this.crucigrama[r][c + 1] != -1) {
                        for (let j = c + 1; j < this.numCols; j++) {
                            if (this.crucigrama[r][j] === "=") {
                                first_number = this.crucigrama[r][j - 3];
                                second_number = this.crucigrama[r][j - 1];
                                expression = this.crucigrama[r][j - 2];
                                result = this.crucigrama[r][j + 1];
                                break;
                            }
                        }
                        // si toda la expresion está rellena, calcular si es correcta
                        if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
                            var e = [first_number, expression, second_number].join("");
                            expression_row = result == eval(e);
                        }
                    }
                }

            }
        }

        this.checkRowColumn(expression_row, expression_column, this.clicked, this.clicked.getAttribute("data-row"), this.clicked.getAttribute("data-col"), value);
        this.checkFinish();

    }

    /**
     * si se cumple la win condition saca el tiempo que se ha tardado en completar el crucigrama y crea
     * el record form
     */
    checkFinish() {
        if (this.check_win_condition()) {
            this.end_time = new Date();
            let dateDifference = this.calculate_date_difference();

            window.alert(`Enhorabuena!!! Has completado el crucigrama :)\nHas tardado ${dateDifference}.`)

            removeEventListener("keydown", this.hk);
            this.createRecordForm();
        }
    }

    /**
     * comprueba si están bien tanto la expresión vertical (columna) como la horizontal (fila)
     */
    checkRowColumn(expR, expC, cell, r, c, value) {
        if (expR && expC) {
            cell.textContent = value;
            cell.setAttribute("data-state", "correct");
        }
        else {
            this.crucigrama[r][c] = 0;
            cell.removeAttribute("data-state");
        }
    }

    calculateSeconds() {
        // la diferencia esta en milisegundos
        let dif = this.end_time - this.init_time;
        // calcular segundos
        return Math.floor(dif / 1000);
    }

    handleKeydown(event) {
        let validValues = /^[1-9+\-*\/]$/;
        let v = event.key;
        let cell = document.querySelector("p[data-state='clicked']");
        let isValid = validValues.test(v);

        // si no hay ninguna celda seleccionada
        if (!cell) {
            window.alert("Debe seleccionar una celda para introducir un valor.")
        }
        // si hay una celda seleccionada
        else {
            if (v === "Shift") {
                return;
            }
            else if (!isValid) {
                window.alert("El valor introducido no es válido. Prueba a introducir un número del 1 al 9 o alguno de los siguientes operadores: +, -, *, /");
            }
            else {
                this.introduceElement(v);
            }
        }
    }

    createRecordForm() {
        // añadir con jquery un formulario debajo del crucigrama cuando se haya completado
        let form = $("<form>").attr("action", "#").attr("method", "post").attr("name", "record");
        let nombre = $("<input>").attr("type", "text").attr("name", "nombre").attr("placeholder", "Nombre");
        form.append(nombre);

        let apellidos = $("<input>").attr("type", "text").attr("name", "apellidos").attr("placeholder", "Apellidos");
        form.append(apellidos);

        let nivel = $("<input>").attr("type", "text").attr("name", "nivel").attr("value", `${this.nivel}`).attr("readonly", "true");
        form.append(nivel);

        let tiempo = $("<input>").attr("type", "text").attr("name", "tiempo").attr("value", `${this.calculateSeconds()}`).attr("readonly", "true");
        form.append(tiempo);

        let boton = $("<input>").attr("type", "submit").attr("value", "Guardar");
        form.append(boton);

        $('article[data-element="crucigrama"]').after(form);
    }

}

var crucigrama = new Crucigrama();

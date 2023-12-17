class Crucigrama {

    board;
    numCols = 9;
    numRows = 11;
    init_time;
    end_time;

    crucigrama; // variable de tipo array que contiene la representación del tablero

    constructor() {
        this.crucigrama = new Array(this.numRows).fill(0).map(() => new Array(this.numCols).fill(0));

        // nivel fácil
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,- ,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        this.level = "facil";

        // // nivel medio
        // this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
        // this.level = "medio";

        // // nivel difícil;
        // this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
        // this.level = "dificil";
    }

    /**
     * pone valores dentro de las celdas del array bidimensional "crucigrama"
     * el valor de cada posición se debe tomar de la cadena this.BOARD que se recorre caracter a caracter
     *      - si el valor en es numérico -> vuelca el mismo número en el array
     *      - si el valor es un "." -> la celda estará vacía
     *      - si el valor es un "#" -> la celda estará deshabilitada
     */
    start() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = this.board.split(',')[i * this.numCols + j];

                if (v === '.') // la celda estará vacía
                    this.crucigrama[i][j] = 0;
                else if (v === '#') // la celda estará deshabilitada
                    this.crucigrama[i][j] = -1;
                else if (!isNaN(v)) // la celda tendrá el mismo número del array
                    this.crucigrama[i][j] = parseInt(v);
                else // la celda tendrá un operador
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
                if (v == 0) {
                    par.addEventListener("click", this.clickC.bind(par, this));
                }
                else {
                    // el número ya fue rellenado al principio
                    if (v > 0) {
                        par.setAttribute("data-state", "blocked");
                    }
                    // la casilla estará deshabilitada
                    else if (v === -1) {
                        par.textContent = "";
                        par.setAttribute("data-state", "empty");
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
        if (crucigrama.clicked)
            crucigrama.clicked.setAttribute("data-state", "");
        this.setAttribute("data-state", crucigrama.clicked);
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

        if (isComplete) {
            // si todas las cuadrículas están llenas correctamente
            // TODO condición
            let congrats = document.createElement("p");
            congrats.textContent = "Enhorabuena!!! Has completado el crucigrama :)";

            document.getElementsByTagName("body")[0].append(congrats);
        }
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

    introduce(value) {
        let r, c;
        let cell = $("p[data-state='clicked']")


        // sacamos la posición de la celda (formato XY)
        // si la longitud de data-element es menor que 2, la celda está en una fila menor que 9
        if (cell.attr("data-element").length < 2) {
            // row
            r = parseInt(cell.attr("data-element").charAt(0));
            // column
            c = parseInt(cell.attr("data-element").charAt(1));
        }
        // si no, la celda está en una fila mayor que 9
        else {
            // row
            r = parseInt(cell.attr("data-element").charAt(0) + cell.attr("data-element").charAt(1));
            // column
            c = parseInt(cell.attr("data-element").charAt(2));
        }

        // si el valor que se introdujo es un numero -> parseint, si no (es un operador) poner el propio valor
        // si el valor es un número, introducimos el número parseado a int
        if (!isNaN(value)) {
            this.crucigrama[r][c] = parseInt(value);
        }
        // si el valor no es un número, será un operador, introducimos su valor tal cual
        else {
            this.crucigrama[r][c] = value;
        }

        // inicializar a true
        let expR, expC;

        let first_number;
        let second_number;
        let expression;
        let result;

        // si está en la última columna del crucigrama, no hace falta comprobar la vertiente horizontal
        if (columna < this.columns - 1) {
            // si a la derecha no hay ninguna celda con valor -1, hay que testear la expresión
            if (this.boardInArray[fila][columna + 1] != -1) {
                for (let j = columna + 1; j < this.columns; j++) {
                    if (this.boardInArray[fila][j] === "=") {
                        first_number = this.boardInArray[fila][j - 3];
                        second_number = this.boardInArray[fila][j - 1];
                        expression = this.boardInArray[fila][j - 2];
                        result = this.boardInArray[fila][j + 1];
                        break;
                    }
                }
                // si toda la expresion está rellena, calcular si es correcta
                if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
                    var expresionmatematica = [first_number, expression, second_number].join("");
                    expression_row = result == eval(expresionmatematica);
                }
            }
        }
        // si está en la última fila del crucigrama, no hace falta comprobar la vertiente vertical
        if (fila < this.rows - 1) {
            // si debajo hay una celda con -1, no hay expresion que testear
            if (this.boardInArray[fila + 1][columna] != -1) {

                for (let i = fila + 1; i < this.rows; i++) {
                    if (this.boardInArray[i][columna] === "=") {
                        first_number = this.boardInArray[i - 3][columna];
                        second_number = this.boardInArray[i - 1][columna];
                        expression = this.boardInArray[i - 2][columna];
                        result = this.boardInArray[i + 1][columna];
                        break;
                    }
                }
                if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
                    var expresionmatematica = [first_number, expression, second_number].join("");
                    expression_col = result == eval(expresionmatematica);
                }
            }
        }

        // comprobar si es correcto en vertical y horizontal
        if (expression_col && expression_row) {
            cell.text(value);
            cell.attr("data-state", "correct");
        }
        else {
            this.boardInArray[fila][columna] = 0;
            cell.removeAttr("data-state");
        }

        if (this.check_win_condition()) {
            this.end_time = new Date();
            let result = this.calculate_date_difference();
            window.alert(`Has completado el crucigrama en un módico tiempo de ${result}`)
            this.createRecordForm();
            removeEventListener("keydown", this.boundHandleKeydown);
        }
    }

    calculateSeconds() {
        // la diferencia esta en milisegundos
        let dif = this.end_time - this.init_time;
        // calcular segundos
        return Math.floor(dif / 1000);
    }

    handleKeydown(event) {
        let regexp = /^[1-9+\-*\/]$/;
        let value = event.key;
        const isSelectedCell = $("p[data-state='clicked']");
        const isValid = regexp.test(value);
        // algunos teclados no tienen los operadores y tienen que ponerlos con shift
        if (!isSelectedCell) {
            window.alert("¡Debe seleccionar una celda antes!")
        }
        else if (value === "Shift") {
            return;
        }
        else if (isValid && isSelectedCell) {
            this.introduceElement(value);
        }
        else {
            window.alert("Solo se pueden introducir valores del 1-9 o +, -, * y /");
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
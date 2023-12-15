// Ejercicio2 - javascript
class Sudoku {

    BOARD = ["3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6",
        "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7",
        "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984"];

    // states of the cards
    BLOCKED = "blocked";
    CLICKED = "clicked";
    CORRECT = "correct";
    INIT = "init";

    clicked; // boolean
    warningShown; // boolean
    incorrectNumberShown;




    /*
        blocked -> contiene un número desde el inicio del sudoku
        clicked -> ha sido pulsada por el usuario
        correct -> ha sido rellenada por el usuario
     */

    constructor() {
        this.numRows = 9;
        this.numCols = 9;
        this.sudoku = new Array(this.numRows).fill(0).map(() => new Array(this.numCols).fill(0));
    }


    /**
     * pone valores dentro de las celdas del array bidimensional "sudoku"
     * el valor de cada posición se debe tomar de la cadena this.BOARD que se recorre caracter a caracter
     *      - si el valor en es numérico -> vuelca el mismo número en el array
     *      - si el valor es un "." -> introduce un 0 en dicha posición del array
     */
    start() {
        let index = 0;
        let option = this.BOARD[Math.floor(Math.random() * 3)];

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = option[index++];
                if (v != '.')
                    this.sudoku[i][j] = parseInt(v);
                else
                    this.sudoku[i][j] = 0;
            }
        }
    }

    /**
     * crea en el documento HTML los párrafos que representarán las celdas del sudoku
     */
    createStructure() {
        let main = document.getElementsByTagName("main")[0];

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = this.sudoku[i][j];
                let par = document.createElement("p");

                par.setAttribute("data-row", i);
                par.setAttribute("data-col", j);
                if (v == 0) {
                    par.setAttribute("data-state", this.INIT);
                    par.addEventListener("click", this.clickC.bind(par, this));
                }
                else {
                    par.textContent = v;
                    par.setAttribute("data-state", this.BLOCKED);
                }
                main.append(par);
            }
        }
    }

    clickC(game) {
        if (game.clicked) {
            game.clicked.setAttribute("data-state", this.INIT);
        }

        this.setAttribute("data-state", game.CLICKED);
        game.clicked = this;


    }

    /**
     * pone dentro de cada párrafo el valor que corresponda
     */
    paintSudoku() {
        this.createStructure();
    }

    /**
     * las únicas teclas que se deben permitir son las numéricas del 1-9 por lo que el resto de teclas que pulse el usuario se deben ignorar
     * 
     * al detectarse una pulsación de teclado se comprueba:
     *      1. una celda del sudoku como receptora del número debe estar seleccionada con  anterioridad a la pulsación del teclado
     *      2. si la tecla pulsada es un número y hay celda seleccioonada, llamar a introduceNumber() pasándole como parámetro la tecla que se ha pulsado 
     *      3. si la tecla pulsada es un número pero no hay celda seleccionada, se debe informar al usuario que debe seleccionar una celda antes de puslar un número
     */
    keydown(event) {
        let warning = document.querySelector("body>p");
        if (warning)
            warning.remove();
        // comprobación 1
        if (event.key > '0' && event.key <= '9') {
            if (!this.clicked) {
                this.checkWarning()
            }
            else {
                this.introduceNumber(event.key);
            }
        }
    }

    /**
     * si no hay un aviso mostrado en pantalla, se crea uno nuevo y se muestra 
     */
    checkWarning() {
        if (!this.warningShown) {
            let warning = document.createElement("p");
            warning.textContent = "Debes seleccionar una celda para introducir un número.";

            document.getElementsByTagName("body")[0].append(warning);
            this.warningShown = true;
        }
    }

    /**
     * condiciones a cumplir:
     *      1. no existe un número igual en la misma fila
     *      2. no existe un número igual en la misma columna 
     *      3. no existe un número igual en la sub-cuadrícula de 3x3 en la que se encuentra la celda seleccionada
     * 
     * si se cumplen estas tres condiciones -> el número es válido
     *      - deshabilitar la opción de hacer click en la casilla seleccionada quitando el manejador del evento
     *      - modificar el valor del atributo data-state a correct a la casilla seleccionada 
     */
    introduceNumber(number) {
        // si el número introducido es válido
        if (this.checkRow(number) && this.checkColumn(number) && this.checkSquare(number)) {
            this.clicked.textContent = number;
            this.clicked.removeEventListener("click", this.clicked.clickC);
            this.clicked.setAttribute("data-state", this.CORRECT);
            let x = this.clicked.getAttribute("data-row");
            let y = this.clicked.getAttribute("data-col");

            this.sudoku[x][y] = parseInt(number);
            this.checkBoard();
        }

        // si el número introducido no es válido
        else {
            this.clicked.setAttribute("data-state", this.INIT);

            if (!this.incorrectNumberShown) {
                let warning = document.createElement("p");
                warning.textContent = "El número introducido no es válido. Inténtelo de nuevo.";
                document.getElementsByTagName("body")[0].append(warning);
                this.incorrectNumberShown = true;
            }
        }
        this.clicked = undefined;
    }

    /**
     * comprueba si existe un número igual que el pulsado en la misma fila de la celda seleccionada en la que se quiere introducir el número
     */
    checkRow(numberToCheck) {
        const currentRow = this.clicked.getAttribute("data-row");
        const isPresent = this.sudoku[currentRow].some((num) => parseInt(num) === parseInt(numberToCheck));
        return !isPresent;
    }

    /**
     * comprueba si existe un número igual que el pulsado en la misma columna de la celda seleccionada en la que se quiere introducir el número
     */
    checkColumn(numberToCheck) {
        const currentColumn = this.clicked.getAttribute("data-col");
        const isPresent = this.sudoku.some((s) => parseInt(s[currentColumn]) === parseInt(numberToCheck));

        return !isPresent;
    }

    /**
     * comprueba si existe un número igual que el pulsado en el mimso bloque de 3x3 de la celda seleccionada en la que se quiere introducir el número
     */
    checkSquare(numberToCheck) {
        const squareRow = Math.floor(this.clicked.getAttribute("data-row") / 3) * 3;
        const squareColumn = Math.floor(this.clicked.getAttribute("data-col") / 3) * 3;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const nRow = squareRow + r;
                const nCol = squareColumn + c;

                if (parseInt(this.sudoku[nRow][nCol]) === parseInt(numberToCheck)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * comprueba si ya están rellenas todas las cuadrículas del sudoku
     */
    checkBoard() {
        let isComplete = true;
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.sudoku[i][j] === 0)
                    isComplete = false;
            }
        }

        if (isComplete) {
            // si todas las cuadrículas están llenas correctamente
            // TODO condición
            let congrats = document.createElement("p");
            congrats.textContent = "Enhorabuena!!! Has completado el sudoku :)";

            document.getElementsByTagName("body")[0].append(congrats);
        }
    }
}


var sud = new Sudoku();
sud.start();
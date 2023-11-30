// Ejercicio2 - javascript
class Sudoku {

    BOARD = ["3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6",
        "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7",
        "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984"];

    // states of the cards
    BLOCKED = "blocked";
    CLICKED = "clicked";
    CORRECT = "correct";

    clicked; // boolean
    warningShown; // boolean




    /*
        blocked -> contiene un número desde el inicio del sudoku
        clicked -> ha sido pulsada por el usuario
        correct -> ha sido rellenada por el usuario
     */

    constructor() {
        this.numRows = 9;
        this.numCols = 9;
        this.arrayBoard = new Array(this.numRows).fill(0).map(() => new Array(this.numCols).fill(0));
    }


    /**
     * pone valores dentro de las celdas del array bidimensional "arrayBoard"
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
                    this.arrayBoard[i][j] = parseInt(v);
                else
                    this.arrayBoard[i][j] = 0;
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
                let v = this.arrayBoard[i][j];
                let par = document.createElement("p");

                par.setAttribute("data-row", i);
                par.setAttribute("data-col", j);

                if (v == 0) {
                    par.setAttribute("data-state", this.INIT);
                    par.addEventListener("click", this.click.bind(par, this));
                }
                else {
                    par.textContent = v;
                    par.setAttribute("data-state", this.BLOCKED);
                }
                main.append(par);
            }
        }
    }

    click(game) {
        if (!game.clicked) {
            game.setAttribute("data-state", this.CLICKED);
        }
        else {
            game.setAttribute("data-state", this.INIT);
        }
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
        // comprobación 1
        if (event.key > '0' && event.key <= '9') {
            if (!game.clicked) {
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
        if (!game.warningShown) {
            let warning = document.createElement("body>p");
            warning.textContent = "Debes seleccionar una celda para introducir un número.";

            document.getElementsByTagName("body")[0].append(warning);
            game.warningShown = true;
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
        if (this.checkRow() && this.checkColumn() && this.checkSquare()) {
            this.clicked.textContent = number;
            this.clicked.removeEventListener("click", this.clicked.click);
            this.clicked.setAttribute("data-state", this.CORRECT);

            this.checkBoard();
        }
    }

    /**
     * comprueba si existe un número igual que el pulsado en la misma fila de la celda seleccionada en la que se quiere introducir el número
     */
    checkRow() {

    }

    /**
     * comprueba si existe un número igual que el pulsado en la misma columna de la celda seleccionada en la que se quiere introducir el número
     */
    checkColumn() {

    }

    /**
     * comprueba si existe un número igual que el pulsado en el mimso bloque de 3x3 de la celda seleccionada en la que se quiere introducir el número
     */
    checkSquare() {

    }

    /**
     * comprueba si ya están rellenas todas las cuadrículas del sudoku
     */
    checkBoard() {

        // si todas las cuadrículas están rellenas
        let congrats = document.createElement("body>p");
        congrats.textContent = "Enhorabuena!!! Has completado el sudoku :)";

        document.getElementsByTagName("body")[0].append(congrats);

    }
}


var sud = new Sudoku();
sud.start();
// Ejercicio2 - javascript
class Sudoku {

    BOARD = ["3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6",
        "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7",
        "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984"];
    // states of the cards
    BLOCKED = "blocked";
    CLICKED = "clicked";
    CORRECT = "correct";

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
    createStructure()  {
        let main = document.getElementsByTagName("main")[0];

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let v = this.arrayBoard[i][j];
                let par = document.createElement("p");
                
                par.setAttribute("data-row", i);
                par.setAttribute("data-col", j);

                if (v == 0) {
                    par.setAttribute("data-state", this.INIT);
                    par.addEventListener("click", this.clickCell.bind(par, this));
                }
                else {
                    par.textContent = v;
                    par.setAttribute("data-state", this.BLOCKED);
                }
                main.append(par);
            }
        }
    }

    clickCell(game) {
        // if (game.CLICKED)
    }

    /**
     * pone dentro de cada párrafo el valor que corresponda
     */
    paintSudoku() {
        this.createStructure();
    }

}


var sud = new Sudoku();
sud.start();
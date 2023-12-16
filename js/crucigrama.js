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

}

var crucigrama = new Crucigrama();
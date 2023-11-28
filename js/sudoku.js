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
        this.arrayBoard;
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

            }
        }
    }

    /**
     * pone dentro de cada párrafo el valor que corresponda
     */
    paintSudoku() {

    }

    /**
     * coge el objeto JSON y baraja los elementos 
     * 
     * (se puede utilizar cualquier método de ordenación para recorrer y barajar los elemntos (durstendfeld))
     */
    shuffleElements() {
        const cards = this.cards;

        for (let i = cards.length - 1; i > 0; i--) {

            // genera un número entre 0 y i (porque i+1 no está incluído en el rango)
            const j = Math.floor(Math.random() * (i + 1));

            // intercambio de los elementos
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }


    /**
     * 1 - bloquea el tablero (lockBoard=true)
     * 2 - voltea las cartas que estén bocarriba (cómo sabemos???)
     * 3 - resetea el tablero
     * 
     * nota: para que la ejecución del volteo de las tarjetas y el reseteo del tablero se realice con cierto margen temporal después del volteo de la segunda tarjeta, se puede meter dentro un delay utilizando el método setTimeOut() de ECMAScript
     */
    unflipCards() {
        this.lockBoard = true; // bloquear el tablero

        setTimeout(() => {
            this.firstCard.dataset.state = this.INIT;
            this.secondCard.dataset.state = this.INIT;
            this.resetBoard();
        }, 1200); // miliseconds

        console.log("the cards do not match :( try again!");
    }

    /**
     * 1 - settea a null las variables firstCard y secondCard 
     * 2 - pone a false las variables hasFlippedBoard y lockBoard
     */
    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;

        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    /**
     * comprueba si las cartas volteadas son iguales
     *      - si lo son -> llama al método disableCards()
     *      - si no lo son -> llama al método resetBoard() (y da la vuelta a las cartas volteadas)
     * 
     * (se puede usar un operador ternario)
     */
    checkForMatch() {
        if (this.firstCard.isEqualNode(this.secondCard)) {
            this.disableCards();
        }
        else {
            this.unflipCards();
        }
    }


    /**
     * 1 - deshabilita las interacciones sobre las tarjetas de memoria que ya hayan sido emparejadas
     * 2 - modifica el valor del atributo data-state a revealed 
     * 3 - invoca al método resetBoard()
     */
    disableCards() {
        this.firstCard.dataset.state = this.REVEALED;
        this.secondCard.dataset.state = this.REVEALED;
        this.resetBoard();
    }


    /**
     * recorre el objeto JSON y crea por cada elemento existente en él un nodo article en el documento html para representar cada tarjeta del juego de memoria
     */
    createElements() {
        var section = document.getElementsByTagName("section")[1];

        for (let i = 0; i < this.cards.length; i++) {
            let e = this.cards[i];
            let article = document.createElement("article");

            article.setAttribute("data-element", e.element);
            article.setAttribute("data-state", this.INIT);

            let h2 = document.createElement("h3");
            h2.innerText = "Tarjeta de memoria";


            let image = document.createElement("img");
            image.setAttribute("src", e.source);
            image.setAttribute("alt", e.element);

            article.append(h2);
            article.append(image);
            section.append(article);
        }
    }


    /**
     * recorre todas las tarjetas y provoque una llamada al método flipCard() cuando se lance dicho evento
     */
    addEventListeners() {
        var article = document.getElementsByTagName("article");

        for (let i = 0; i < article.length; i++) {
            let c = article[i];
            c.addEventListener("click", this.flipCard.bind(c, this));
        }
    }

    /**
     * se encarga de dar la vuelta a las tarjetas cuando estas sean pulsadas por el usuario. recibe como parámetro una variable "game" que representa el juego
     */
    flipCard(game) {
        console.log("flipCard: " + this.dataset.state);
        // IFs
        // si la tarjeta pulsada ya está revelada y formaba parte de una pareja ya descubierta (data-state=revealed), return
        if (this.dataset.state == game.REVEALED)
            return;

        // si lockBoard=true, return
        if (game.lockBoard)
            return;

        // si la tarjeta pulsada por el usuario coincide con la tarjeta pulsada anteriormente como primer elemento de la pareja actual (firstCard) return
        if (this == game.firstCard)
            return;


        // ELSE
        this.dataset.state = game.FLIP;
        // si el juego ya tenía una tarjeta volteada 
        if (game.hasFlippedCard) {
            // asignar la variable secondCard a this e invocar checkForMatch()
            game.secondCard = this;
            game.checkForMatch();
        }
        else {
            game.hasFlippedCard = true;
            game.firstCard = this;
        }
    }





}


var mem = new Memoria();
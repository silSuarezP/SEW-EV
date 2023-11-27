// Ejercicio2 - javascript
class Memoria {

    // states of the cards
    INIT = "init";
    FLIP = "flip";
    REVEALED = "revealed";

    /*
    hasFlippedCard -> indica si ya hay una carta dada la vuelta, default:false
    lockBoard -> indica si el tablero se encuentra bloqueado a la interacción del usuario, default:false
    firstCard -> indica cuál es la primera carta a la que se ha dado la vuelta en esta interacción, default: null
    secondCard -> indica cuál es la segunda carta a la que se ha dado la vuelta en esta interacción, default: null

     */

    constructor() {
        this.cards = [
            {
                "element": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "element": "HTML5",
                "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"
            },
            {
                "element": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "element": "CSS3",
                "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
            },
            {
                "element": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "element": "JS",
                "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"
            },
            {
                "element": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "element": "PHP",
                "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
            },
            {
                "element": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "element": "SVG",
                "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
            },
            {
                "element": "W3C",
                "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
            },
            {
                "element": "W3C",
                "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"
            }
        ]

        // default values
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;


        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
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

        setTimeout(() => { // delay
            flippedCards.forEach(card => {
                this.firstCard.dataset.state = this.INIT;
                this.secondCard.dataset.state = this.INIT;
            }, 1200); // miliseconds
        });
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

        for (var e in this.cards) {
            var article = document.createElement("article");

            article.setAttribute("data-element", this.cards[e].element);
            article.setAttribute("data-state", this.INIT);

            var h2 = document.createElement("h3");
            h2.innerText = "Tarjeta de memoria";


            var image = document.createElement("img");
            image.setAttribute("src", this.cards[e].source);
            image.setAttribute("alt", this.cards[e].element);

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
            game.flippedCard = true;
            game.firstCard = this;
        }
    }





}


var mem = new Memoria();
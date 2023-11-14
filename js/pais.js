// Ejercicio1 - javascript 

class Pais {

    // CONSTRUCTOR 2
    // nombre, capital, poblacion
    constructor(name, capitalName, population) {
        this.name = hola;
        this.capitalName = capitalName;
        this.population = population;
    }

    setOtherAttributes(government, coords, religion) {
        this.government = government;
        this.coords = coords;
        this.religion = religion;
    }

    // GETTERS
    getName() {
        return this.name;
    }

    getCapitalName() {
        return this.capitalName;
    }

    getPopulation() {
        return this.population;
    }

    getGovernment() {
        return this.government;
    }

    getReligion() {
        return this.religion;
    }

    // TO STRING
    getInfo() {
       return "Nombre del país: " + this.name + "; Nombre de la capital: " + this.capitalName, "; Población: " + this.population + "; Forma de gobierno: " + this.government + "; Religión mayoritaria: " + this.religion;
    }

    getSecInfo() {
        return "Población: " + this.population + "; Forma de gobierno: " + this.government + "; Religión mayoritaria: " + this.religion;
    }

    getSecInfoHTML() {
        const res = `
                <ul>
                    <li>Población: ${this.population}</li>
                    <li>Forma de gobierno: ${this.government}</li>
                    <li>Religión mayoritaria: ${this.religion}</li>
                </ul>
            `;
        return res;
    }

    // WRITE IN A DOCUMENT
    writeCoordsInDoc(capitalCoordinates) {
        // ?? check
        document.write("Las coordenadas del país son: " + capitalCoordinates);
    }

}

/*
nombre = Nauru
capital = Yaren
poblacion = 12511
formaGobierno = república democrática parlamentaria
coordenadasCapital = 0°32′52″S 166°55′15″E
religion = cristianismo
*/
// var paisNauru = new Pais("Nauru", "Yaren", 12511, "República democrática parlamentaria", "0°32′52″S 166°55′15″E", "Cristianismo");
var paisNauru = new Pais("Nauru", "Yaren", 12511);
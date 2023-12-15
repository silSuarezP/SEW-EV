// Ejercicio1 - javascript 

class Pais {

    // CONSTRUCTOR 2
    // nombre, capital, poblacion
    constructor(name, capitalName, population) {
        this.name = name;
        this.capitalName = capitalName;
        this.population = population;
    }

    setOtherAttributes(government, latitude, longitude, religion) {
        this.government = government;
        this.latitude = latitude;
        this.longitude = longitude;
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
       return "Nombre del país: " + this.name + ".\nNombre de la capital: " + this.capitalName, ".\nPoblación: " + this.population + ".\nForma de gobierno: " + this.government + ".\nReligión mayoritaria: " + this.religion;
    }

    getInfoHTML() {
        var res = `
                <ul>
                    <li>Nombre del país: ${this.name}</li>
                    <li>Nombre de la capital: ${this.capitalName}</li>
                </ul>
            `;
        return res;
    }

    getSecInfo() {
        return "Población: " + this.population + "; Forma de gobierno: " + this.government + "; Religión mayoritaria: " + this.religion;
    }

    getSecInfoHTML() {
        var res = `
                <ul>
                    <li>Población: ${this.population}</li>
                    <li>Forma de gobierno: ${this.government}</li>
                    <li>Religión mayoritaria: ${this.religion}</li>
                </ul>
            `;
        return res;
    }

    // WRITE IN A DOCUMENT
    writeCoords(latitude, longitude) {
        // ?? check
        document.write("Las coordenadas del país son: " + this.latitude + ", " + this.longitude);
    }

}

/*
nombre = Nauru
capital = Yaren
poblacion = 12511
formaGobierno = república democrática parlamentaria
latitud = "-0.5333000"
longitud = "166.9167000"
religion = cristianismo
*/
// var paisNauru = new Pais("Nauru", "Yaren", 12511, "República democrática parlamentaria", "-0.5333000", "166.9167000", "Cristianismo");
var paisNauru = new Pais("Nauru", "Yaren", 12511);
// Ejercicio1 - javascript 

class Pais {

    // CONSTRUCTOR
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


    // api_key = 18c76dd091c5ca9d98c472bf619dbeb4
    getWeather() {
        var p = this;
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${p.latitude}&lon=${p.longitude}&appid=18c76dd091c5ca9d98c472bf619dbeb4`;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (data) {
                let l = data.list.filter((e) => e.dt_txt.split(' ')[1] == '12:00:00');

                l.forEach((item) => {
                    let date = new Date(item.dt_txt);
                    let day = date.toLocaleDateString('es-Es', { weekday: 'long' });
                    let dateStr = date.toLocaleDateString('es-Es', { day: '2-digit', month: '2-digit', year: 'numeric' });

                    let h3day = $("<h3></h3>").text(day);
                    let pDate = $("<p></p>").text(dateStr);

                    let temp = $("<h3></h3>").text(`${item.main.temp} ºC`);
                    let maxTemp = $("<li></li>").text(`Máxima: ${item.main.temp_max}ºC`);
                    let minTemp = $("<li></li>").text(`Mínima: ${item.main.temp_min}ºC`);
                    let humidity = $("<li></li>").text(`Humedad: ${item.main.humidity}%`);
                    let weatherList = $("<ul></ul>").append(maxTemp, minTemp, humidity);

                    let iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                    let iconImg = $("<img></img>", { src: iconUrl, alt: item.weather[0].description });

                    let article = $("<article></article>").append(h3day, pDate, iconImg, temp, weatherList);

                    $("section").append(article);
                });
            }
        });
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
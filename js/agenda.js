class Agenda {

    INTERVAL = 15000; // 15 segundos

    constructor() {
        this.url = "https://ergast.com/api/f1/current";
        this.last_api_call = null;
        this.last_api_result = null;
    }


    showData() {
        // eliminamos todos los articles antes de realizar una llamada nueva a la api
        $('section').remove();


        let section = $("<section>").attr("data-element", "carreras");
        let heading = $("<h3>").text("Carreras de F1");
        section.append(heading);

        let week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        $(this.last_api_result).find('Race').each((index, element) => {

            // race number, race name, circuit name, circuit coordinates, locality, date
            let xmlData = $(element);
            let article = $("<article>");

            // Race number, race name, circuit name, circuit coordinates, locality, date
            let raceNumber = $("<p>").text("#" + xmlData.attr("round")).attr("data-element", "numero");
            console.log("race number: " + raceNumber);

            let raceName = $("<h3>").text(xmlData.find("RaceName").text());
            console.log("race name: " + raceName.text());

            let circuitName = $("<p>").text(xmlData.find("CircuitName").text()).attr("data-element", "nombreCircuito").attr("lang", "en");
            console.log("circuit name: " + circuitName.text());

            let location = xmlData.find("Location");
            let circuitCoords = $("<p>").text("Lat: " + location.attr("lat") + ", Long: " + location.attr("long")).attr("data-element", "coordenadasCircuito");
            console.log("circuit coords: " + circuitCoords.text());

            let locality = $("<p>").text(xmlData.find("Locality").text() + ", " + xmlData.find("Country").text()).attr("data-element", "lugar").attr("lang", "en");
            console.log("locality: " + locality.text());

            // Date
            let d = new Date(xmlData.find("Race>Date", this).text() + 'T' + xmlData.find("Race>Time", this).text());
            let date = $("<p>").text("Date: " + d.toLocaleDateString('es-Es', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }));
            console.log("date: " + date);

            article.append(raceNumber);
            article.append(raceName);
            article.append(circuitName);
            article.append(circuitCoords);
            article.append(date);
            article.append(locality);

            section.append(article);
        });

        $("body").append(section);
    }


    call() {
        let rn = new Date().getTime();

        if (rn - this.last_api_call < this.INTERVAL) {
            return this.last_api_result;
        }

        this.last_api_call = new Date().getTime(); // almacena la fecha exacta dela última llamada que se hizo a la api

        let d = null; // variable auxiliar para almacenar los datos obtenidos de la consulta

        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: (data) => {
                console.log(data);
                this.last_api_result = data;
                this.showData();
                d = data;
            },
            error: function () {
                $("h3").html("Error. No se pudo obtener información.");
            }
        });

        return d;
    }

}

var agenda = new Agenda();


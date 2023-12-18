class Noticias {

    constructor() {
        let main = document.getElementsByTagName("main")[0];
        let par = document.createElement("p");

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            par.textContent = "Este navegador soporta el API File";
        }
        else {
            par.textContent = "Este navegador no soporta el API File. Esto peude conllevar un funcionamiento incorrecto.";
        }

        main.append(par);
    }

    readInputFile(files) {
        let file = files[0];
        if (file.type.match(/text.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                let main = document.getElementsByTagName("main")[0];
                let lines = reader.result.split("\n");
                for (let i = 0; i < lines.length; i++) {

                    let noticia = lines[i].split('_');
                    let titular = document.createElement("h2");
                    titular.textContent = noticia[0];

                    let entradilla = document.createElement("h3");
                    entradilla.textContent = noticia[1];

                    let texto = document.createElement("p");
                    texto.textContent = noticia[2];

                    let autor = document.createElement("p");
                    autor.textContent = noticia[3];

                    let news = document.createElement("article");
                    news.append(titular, entradilla, texto, autor);

                    main.append(news);
                }
            }
            reader.readAsText(file);
        } else {
            let p = document.createElement("p");
            p.textContent = "El archivo no es válido";
            main.append(p);
        }
    }

    add() {
        let v = $("input[type=\"text\"]");

        for (let i = 0; i < v.length; i++) {
            if (v[i].value == "") {
                alert("Para poder añadir la noticia, todos los campos deben ser rellenados.");
                return;
            }
        }

        let titular = document.createElement("h2");
        titular.textContent = v[0].value;

        let entradilla = document.createElement("h3");
        entradilla.textContent = v[1].value;

        let texto = document.createElement("p");
        texto.textContent = v[2].value;

        let autor = document.createElement("p");
        autor.textContent = v[3].value;

        let article = document.createElement("article");
        
        article.append(titular);
        article.append(entradilla);
        article.append(texto);
        article.append(autor);

        let main = document.getElementsByTagName("main")[0];
        main.append(article);
    }
}

var noticias = new Noticias();



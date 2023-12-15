class Fondo {

    // api_key = f0bd1ed7583f39d2166977e5e920e3c3

    constructor(countryName, capitalName, latitude, longitude) {
        this.countryName = countryName;
        this.capitalName = capitalName;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    getPhoto() {
        var f = this;
        (function() {
            var api = "https://www.flickr.com/services/rest/";
            $.getJSON(api, 
                    {
                        method: "flickr.photos.search",
                        api_key: "f0bd1ed7583f39d2166977e5e920e3c3",
                        tags: f.countryName + "," + f.capitalName + ",landscape",
                        lat:  f.latitude,
                        long: f.longitude,
                        format: "json",
                        nojsoncallback: 1
                    })
                .done((data) => {
                    if (data.photos.photo.length > 0) {
                        let p = data.photos.photo[Math.floor(Math.random() * 5 + 1)];

                        let link = `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}_b.jpg`;

                        $('body').css('background-image', `url(${link})`);
                    }
            });
        })();
    }
}

var fondo = new Fondo("Nauru", "Yaren",  "-0.5333000", "166.9167000");
fondo.getPhoto();
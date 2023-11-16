class Fondo {


    constructor(countryName, capitalName, coords) {
        this.countryName = countryName;
        this.capitalName = capitalName;
        this.coords = coords;
    }


    consult() {
        (function() {
            var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            $.getJSON(flickrAPI, 
                    {
                        geo: "0°32′52″S 166°55′15″E",
                        format: "json"
                    })
                .done(function(data) {
                        $.each(data.items, function(i,item ) {
                            $("<img />").attr( "src", item.media.m).appendTo( "#imagenes" );
                            if ( i === 20 ) {
                                    return false;
                            }
                        });
            });
        })();
    }







}
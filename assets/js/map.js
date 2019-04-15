
var countries = ["Argentina", "Australia", "Austria", "Belgium", "Bulgaria",
"Canada", "Switzerland", "China", "Germany", "Denmark", "Egypt",
"Spain", "France", "United Kingdom", "Greece", "Hong Kong", "Indonesia", "Italy",
"Jordan", "Cambodia", "Lebanon", "Morocco", "Mongolia", "Portugal", "Paraguay",
"Singapore", "Sweden", "Syria", "Thailand", "Turkey", "United States", "Vatican",
"Vietnam"];

var C={};

function initMap() {
var mymap = L.map('mapid', {zoomControl:false}).setView([40, 0], 1);
mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
               attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                       '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                       'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
               id: 'mapbox.streets'
        }).addTo(mymap);
mymap.fitWorld().zoomIn();

let xhr = new XMLHttpRequest();
xhr.open('GET', '/assets/files/countries_mini.geojson');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
   if (xhr.status !== 200) return
   console.log(xhr.response)
   C.geoJson = L.geoJson(xhr.response, {
           onEachFeature: onEachFeature,
           style: style,
           zoomControl: false,
           }).addTo(mymap);
};
xhr.send();
}
// Add GeoJson Layer

//Callback for mouse out of the country border. Will take care of the ui aspects, and will call
//other callbacks after done.
//\@param e the event
function onCountryMouseOut(e){
       var layer = e.target;
       layer.setStyle({
               weight: 2,
               fillOpacity: 0.3
       });
}

//
// Callback for when a country is clicked. Will take care of the ui aspects, and it will call
// other callbacks when done
// @param e
function onCountryClick(e){
       //callback for clicking inside a polygon
}


// Callback for when a country is highlighted. Will take care of the ui aspects, and it will call
// other callbacks after done.
// @param e
function onCountryHighLight(e){
       var layer = e.target;

       layer.setStyle({
               weight: 1,
               fillOpacity: 0.7
       });

       if (!L.Browser.ie && !L.Browser.opera) {
               layer.bringToFront();
       }
}


function onEachFeature(feature, layer){
       if (countries.indexOf(feature.properties.name) >= 0) {
               layer.setStyle({
                       weight: 2,
                       opacity: 0.4,
                       fillColor: 'green',
                       dashArray: '',
               });
               layer.on({
                       click : onCountryClick,
                       mouseover : onCountryHighLight,
                       mouseout : onCountryMouseOut
               });
       }
}


function style(feature) {
       return {
               fillColor: "#E3E3E3",
               weight: 1,
               opacity: 0.4,
               color: 'white',
               fillOpacity: 0.3
       };
}


window.onload = function(){
        // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
        initMap();
};

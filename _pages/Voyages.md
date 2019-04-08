---
title:  "Voyages"
layout: single
classes: wide
permalink: /Voyages/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
  crossorigin=""/>

  <!-- Make sure you put this AFTER Leaflet's CSS -->
  <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
    integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
    crossorigin=""></script>


 <div id="mapid" style="height: 800px; "></div>
 <script>
        //var CountryJson = assets/files/ne_50m_admin_0_countries.geojson;

 	var mymap = L.map('mapid').setView([51.505, -0.09], 2);
 	//var mymap = L.map('mapid').fitWorld();
 	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
 		maxZoom: 18,
                minZoom: 2,
 		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
 			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
 			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 		id: 'mapbox.streets'
 	}).addTo(mymap);

        // Add GeoJson Layer

         //Callback for mouse out of the country border. Will take care of the ui aspects, and will call
         //other callbacks after done.
         //\@param e the event

        function onCountryMouseOut(e){
        	C.geoJson.resetStyle(e.target);
        //	$("#countryHighlighted").text("No selection");

        	var countryName = e.target.feature.properties.name;
        	var countryCode = e.target.feature.properties.iso_a2;
        //callback when mouse exits a country polygon goes here, for additional actions
        }

        //
         // Callback for when a country is clicked. Will take care of the ui aspects, and it will call
         // other callbacks when done
         // @param e
        function onCountryClick(e){
                //callback for clicking inside a polygon
        }

        var countries = ["Argentina", "Australia", "Austria", "Belgium", "Bulgaria",
        "Canada", "Switzerland", "China", "Germany", "Denmark", "Egypt",
        "Spain", "France", "United Kingdom", "Greece", "Hong Kong", "Indonesia", "Italy",
        "Jordan", "Cambodia", "Lebanon", "Morocco", "Mongolia", "Portugal", "Paraguay",
        "Singapore", "Sweden", "Syria", "Thailand", "Turkey", "United States", "Vatican",
         "Vietnam"];

         var C={};

         // Callback for when a country is highlighted. Will take care of the ui aspects, and it will call
         // other callbacks after done.
         // @param e
        function onCountryHighLight(e){
	var layer = e.target;

	layer.setStyle({
		weight: 2,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	//var countryName = e.target.feature.properties.name;
	//var countryCode = e.target.feature.properties.iso_a2;
        //callback when mouse enters a country polygon goes here, for additional actions
        }
        function onEachFeature(feature, layer){
                if (countries.indexOf(feature.properties.name) >= 0) {
                        layer.setStyle({
                		weight: 2,
                		//color: 'red',
                                fillColor: 'green',
                		dashArray: '',
                		fillOpacity: 0.7
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
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/assets/files/ne_50m_admin_0_countries.geojson');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.onload = function() {
            console.log('Pouet'+xhr.status);

            if (xhr.status !== 200) return
            console.log(xhr.response)
            C.geoJson = L.geoJson(xhr.response, {
                    onEachFeature: onEachFeature,
                    style: style
                    }).addTo(mymap);
        };
        xhr.send();

        //L.geoJson(CountryJson, {
        //        onEachFeature: OnEachFeature,
        //        style: style
        //        }).addTo(mymap);


 </script>

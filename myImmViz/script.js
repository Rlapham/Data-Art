// BaseMap
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
    var map = L.map('map').setView([40.7296342, -0.0027715], 2.1);
    map.addLayer(layer);

    var countryLayer = L.geoJson(null, {
    filter: function(feature) {
        //console.log(feature.properties.name); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.properties.activities.activity == 'steps';
        //return feature.properties.name;
    },
    // style: function(feature){
    //     return{
    //         color: "red",
    //         weight: 2,
    //     }
    // }
});

       var border1Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FFFFFF',
            weight: .5,
            fillOpacity: .9
        }
    }
});

    var border2Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FFF763',
            weight: .5,
            fillOpacity: .9
        }
    }
});

    var border3Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FFD200',
            weight: .5,
            fillOpacity: .9
        }
    }
});

    var border4Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FF9d10',
            weight: .5,
            fillOpacity: .9
        }
    }
});

    var border5Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FF5900' ,
            weight: .5,
            fillOpacity: .9
        }
    }
});

    var border6Layer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.geometry.coordinates); 
        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.coordinates;
        return feature.geometry.coordinates;
    },
    style: function(feature){
        return{
            color: '#FF0000',
            weight: .5,
            fillOpacity: .9
        }
    }
});


    var immLayer = L.geoJson(null, {
    filter: function(feature) {
        console.log(feature.properties); 
        //return feature.properties;

//         return {feature.properties};
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(feature.properties);
//     }
}
})
    //.addTo(map);  


        //console.log(feature.properties.activities[0].steps); 
        // my custom filter function
        //return feature.properties.activities.activity == 'steps';
    //},
    // style: function(feature){
    //     return{
    //         color: "red",
    //         weight: 2,
    //     }
    // }




////////legend
function getColor(d) {
    return d > 5000000 ? '#FF0000' :
           d > 4000000  ? '#FF5900' :
           d > 3000000  ? '#FF9d10' :
           d > 2000000   ? '#FFD200' :
           d > 1000000   ? '#FFF763' :
           d > 5000   ? '#FFFFFF' :
                      '#FFFFFF';
}


var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [5000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



//////////

    var dataLayer = omnivore.geojson("data/border1.geojson", null, border1Layer).addTo(map);
    var dataLayer = omnivore.geojson("data/border2.geojson", null, border2Layer).addTo(map);
    var dataLayer = omnivore.geojson("data/border3.geojson", null, border3Layer).addTo(map); 
    var dataLayer = omnivore.geojson("data/border4.geojson", null, border4Layer).addTo(map);
    var dataLayer = omnivore.geojson("data/border5.geojson", null, border5Layer).addTo(map);
    var dataLayer = omnivore.geojson("data/border6.geojson", null, border6Layer).addTo(map);
    //var dataLayer = omnivore.geojson("data/bordertest.geojson", null, circlesLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/bordertest.geojson", null, testLayer).addTo(map);
    var dataLayer = omnivore.geojson("data/immdata.geojson", null, immLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/places.geojson", null, placesLayer).addTo(map);
    //var dataLayer = omnivore.geojson("data/places.geojson", null, getPlace).addTo(map);
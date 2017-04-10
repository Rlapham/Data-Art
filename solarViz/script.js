// //bounds
var world = new Array(-180, 90, 180, -90);
var US = new Array(-128, 50, -63, 24);
// var APIBounds = L.latLngBounds([[ 23, -128], [ 51, -65]]);
var bounds = US; 
var latDiff = 28;   ///bounds[0] - bounds[1];
var lonDiff = 70;   ///bounds[2] - bounds[3]; 
var wrap; 
var planeX = 1453/1.3; 
var planeY = 830/1.3; 


//camera 
var camX = 0; 
var camY = 0; 
var camZ = 60; 
var tcamX = 0; 
var tcamY = 0; 
var tcamZ = 60; 
var xOffset; 
var xOffset; 
var locked = false; 
// var camXT = .2; 

//API 
var latVal = 41; 
var lonVal = -74;
var solYear = 5; 
var stationLat; 
var stationLon; 
var capFactor;
var apiCheck = false; 
var imgAPI;
var reDraw = false; 

//Google
var googleLat; 
var googleLon;  
var gAdd; 
var gTown; 
var gState; 
var input; 
var button; 

//position
var rot; 
var trot;

//data 
var dataPath = "/Users/richardlapham/Desktop/solarViz"; 
var stations = [];  
var costdata = [];
var tempCoord = [];  
var coord = [];
var price = []; 
 

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  wrap = loadImage("map2.png");
  //submit 
  input = createInput();
  input.position("relative");
  input.class("myInput");

  button = createButton('submit');
  button.position("relative");
  button.class("myButton");
  button.mousePressed(processInput);

  

  // baseMap();
  // orbitControl(); 
  // camera(0, 0, 100);

  //position
  // var rot = createVector(0, 0, 0); 
  // var trot = createVector(1.1, 0, 0); 
  setBounds(US);
  loadData("data/electricityCost.json");


}

function draw(){ 
background(0);
camX = lerp(camX, tcamX, 0.01); 
camY = lerp(camY, tcamY, 0.01); 
camZ = lerp(camZ, tcamZ, 0.01); 
camera(camX, camY, camZ); 



// if (camZ < 0){
//   camZ++; 
// }



// textSize(32);
// text("word", width/2, height/2);

if (apiCheck){
  googleAPI(gAdd, gTown, gState);
  getAPI();
  screenPos();
  apiCheck = false; 
}



push();  
if (mouseIsPressed){
rotateX(map(mouseY, 0, height, -1, 1));
rotateY(map(mouseX, 0, width, -1, 1));
}
texture(wrap);  
plane(planeX, planeY);
// end map

fill(getValColor(capFactor)); 
console.log("!", capFactor); 
console.log(stationLon, stationLat, solYear, capFactor);

var statX = map(stationLon, bounds[0], bounds[2], -planeX/2, planeX/2);
var statY = map(stationLat, bounds[3], bounds[1], planeY/2, -planeY/2);
push();
translate(statX, statY, 0); 
sphere(solYear);
pop(); 

push();
fill('#8B00FF');
var goX = map(googleLon, bounds[0], bounds[2],-planeX/2, planeX/2); 
var goY = map(googleLat, bounds[3], bounds[1], planeY/2, -planeY/2);
translate(goX, goY, 0); 
sphere(3);
pop(); 


pop(); 

// fill(255);
// ellipse(0, 0, 20, 20);

} //draw

function screenPos(){
    tcamX = map(googleLon, bounds[0], bounds[2],-planeX/2, planeX/2); 
    tcamY = map(googleLat, bounds[3], bounds[1], planeY/2, -planeY/2);
    tcamZ = -350; 

 }


//process text
function processInput(){
  var text = input.value();
  text = trim(text); 
  var myStr = text;
  var myStrArr = splitTokens(myStr, ",");

  var tempAdd = myStrArr[0];
  var tempTown = myStrArr[1];
  var tempSt = myStrArr[2]; 
  tempAdd = splitTokens(tempAdd, " ");
  tempTown = splitTokens(tempTown, " ");
  tempSt = splitTokens(tempSt, " ");

  var separator = "+";
  gAdd = join(tempAdd, separator);
  gTown = join(tempTown, separator);
  gState = join(tempSt, separator);

  apiCheck = true; 
}


function getAPI(){
	var xhr = new XMLHttpRequest(); //https://developer.nrel.gov/api/pvwatts/v5.json?api_key=DEMO_KEY&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=0
	xhr.open("GET", "https://developer.nrel.gov/api/pvwatts/v5.json?api_key=bAq8cT82VeWVL7TjuyVAmSpqe075Vs6NKdofy7WY&lat=" + googleLat + "&lon=" + googleLon + "&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=0", false);
	xhr.send();

	console.log(xhr.status);
	console.log(xhr.statusText);
	var response = xhr.response; 
  var json = JSON.parse(response);
  solYear = json.outputs.solrad_annual; 
  capFactor = json.outputs.capacity_factor;
  // console.log(solYear); 
  // console.log(capFactor); 
  console.log(response); 
  // console.log(json.station_info.lat);
  stationLat = json.station_info.lat;
  stationLon = json.station_info.lon; 

  
}

////////legend
  function getValColor(d) {
    return d >= 20 ? '#FF0000' :
           d >= 15  ? '#FF5900' :
           d >= 10  ? '#FF9d10' :
           d >= 5  ? '#FFD200' :
           d >= 2   ? '#FFF763' :
           d >= 1   ? '#FFFFFF' :
                      '#FFFFFF';
}

function googleAPI(address, town, state){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+" + town + ",+" + state +"&key=AIzaSyAI_bUli6cybfi62NqiLtt6U5Uo-W6r_EI", false);
  xhr.send();

  console.log(xhr.status);
  console.log(xhr.statusText);
  var response = xhr.response; 
  var json = JSON.parse(response);
  console.log(response); 
  googleLat = json.results[0].geometry.location.lat; 
  googleLon = json.results[0].geometry.location.lng;

  ellipse(googleLon, googleLat, solYear, solYear);


  // googleLat = round(googleLat, 3, 2); 
  // googleLon = round(googleLon, 3, 2); 
  // console.log(googleLon); 

  // console.log(googleLat, googleLon); 
  
}

function loadData(_url){
  costdata = loadJSON(_url);
}

function processData(){
    ///electricity cost 
  if (costdata.features != null){
    for (var i = 0; i < costdata.features.length; i++){
      coord[i] = costdata.features[i].geometry.coordinates[0][0]; 
      price[i] = costdata.features[i].properties.res_dmwh; 
    }
  } // end if 
}

function setBounds(_bounds){
  bounds = _bounds; 
  // activeHotels = new ArrayList(); 
  //   for (Hotel h: allHotels){
  //     h.setScreenPos();
  //     if (h.tpos.x > 0 && h.tpos.x < width && h.tpos.y > 0 && h.tpos.y < height){
  //        activeHotels.add(h);  
  //     }
  //   }
    
  //   //call active hotels if there are too many
  //   float max = 50000; 
  //   float fraction = max / activeHotels.size(); 
    
  //   ArrayList<Hotel> temps = new ArrayList(); 
  //   for (Hotel h: activeHotels){ 
  //     if  (random(1) < fraction) temps.add(h); 
  //   }
  //   activeHotels = temps; 
}

// function setScreenPos(){
//     tpos.x = map(lonVal, bounds[0], bounds[2], 0, width); 
//     tpos.y = map(latVal, bounds[3], bounds[1], height, 0);
//     // tpos.z = price; 
//  }

function renderCost(){
for (var a = 0; a < coord.length; a++){
  // for (var b = 0; b < coord[a].length; b++){
    if (coord[a][0][0] != null && coord[a][0][1] != null){
    console.log(a); 
    fill(getCostColor(price[a]));
    ellipse(coord[a][0][0], coord[a][0][1], 1, 1);
  } // if 
// } // b
} // a
}



 ////////legend
function getCostColor(d) {
    return d > 200 ? '#FF0000' :
           d > 150  ? '#FF5900' :
           d > 100  ? '#FF9d10' :
           d > 75  ? '#FFD200' :
           d > 50   ? '#FFF763' :
           d > 0   ? '#FFFFFF' :
                      '#FFFFFF';
}
 


// ////mapBox

function baseMap(){
// BaseMap
    var layer = L.tileLayer('https://api.mapbox.com/styles/v1/rlapham/cj19ror5k00562ss30lxr8ai5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmxhcGhhbSIsImEiOiJjaXo0anM2YnMwNjV2MnFwZ2h5YjlkcnR3In0.oj0KCWbMh5IlahZLgYzkhw');
    var map = L.map('map').setView([38, -100], 4.4);
    map.addLayer(layer);
    zoomControl:false; 

    //overlay
    // L.rectangle(mapBounds).addTo(map);
    // map.fitBounds(mapBounds);

    // var image = imgAPI, imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    // L.imageOverlay(imgAPI, APIBounds).addTo(map);

    //electricity layer 
 	var test = L.geoJson(null, {
    filter: function(feature) {
        // console.log(feature.properties.res_dmwh);
        return feature.geometry.coordinates;
        console.log("mapmade");
    },
    style: function(feature){
        return{
            color: getColor(feature.properties.res_dmwh),
            weight: .1,
            fillOpacity: .55
        }
    }
});


////////legend
function getColor(d) {
    return d > 200 ? '#FF0060' :
           d > 150  ? '#E8009F' :
           d > 100  ? '#FF00FC' :
           d > 75  ? '#C300E8' :
           d > 50   ? '#AC00FF' :
           d > 0   ? '#8B00FF' :
                      '#8B00FF';
}

    // //canvas overlay
    // L.canvasOverlay()
    //  .params({data: points})     // optional add any custom data that will be passed to draw function
    //        .drawing(drawingOnCanvas)   // set drawing function
    //        .addTo(leafletMap);         // add this layer to leaflet map
            

    // //Custom drawing function:
    // function drawingOnCanvas(canvasOverlay, params) {
    //           var ctx = params.canvas.getContext('2d');
    //           params.options.data.map(function (d, i) {
    //             // canvas drawing goes here
    //           });
    //       };
          
    // // parameters passed to custom draw function :
    // {
    //                             canvas   : <canvas>,
    //                             bounds   : <bounds in WGS84>
    //                             size     : <view size>,
    //                             zoomScale: <zoom scale is  1/resolution>,
    //                             zoom     : <current zoom>,
    //                             options  : <options passed >
    // };


// //////////////// data
var dataLayer = omnivore.geojson("data/electricityCost.json", null, test).addTo(map);

} // end baseMap



///reference
//   var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=YOUR_API_KEY&q=NewYork,USA'
//   loadJSON(url, drawWeather); 
// }



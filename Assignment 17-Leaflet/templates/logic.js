// Create url to pull data from usgs.gov
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var mapboxURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?"
var mapboxKey = "pk.eyJ1IjoidnAxMDMwIiwiYSI6ImNqZ3loZzg3dTA0Nmcyd3A0c3FwNnNxcDMifQ.qHOP0J9m3fDugC43i4AV8g"

d3.json(URL, function(data){
  createFeatures(data.features);
});

// Set color array for magnitude
var colors = ['green', 'blue', 'yellow', 'orange', 'red', 'maroon']

//Loop through the data and create markers for each earthquake,
//bind a popup containing magnitude, depth, time and color based on magnitude
for (var i = 0; i < data.features.length; i++){
  var feature = data.features[i];
  var loc = feature.geometry.coordinates;
  var magnitude = feature.properties.mag;
  var depth = feature.geometry.coordinates[2];

  if (magnitude < 1){
    color = colors[0]
  } else if (magnitude >= 1 && magnitude < 2){
    color = colors[1]
  } else if (magnitude >= 2 && magnitude < 3){
    color = colors[2]
  } else if (magnitude >= 3 && magnitude < 4){
    color = colors[3]
  } else if (magnitude >= 4 && magnitude < 5){
    color = colors[4]
  } else {
    color = colors[5]
  }
  L.circleMarker([loc[1], loc[0]],{
    fillOpacity: .6,
    color: "black",
    fillColor: color,
    weight: 1,
    radius: markerSize(magnitude) 
  }).bindPopup("<h3>Magnitude : " + magnitude + "</h3>"+"<strong>Depth: </string>" + depth + 'kilometers' +
    '<br>'+new Date(feature.properties.time))
  .addTo(myMap);
}

//set up the legend in the lower right of the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap){

  var div = L.DomUtil.create('div', 'info legend'),

    grades = [0,1,2,3,4,5];
    div.innerHTML = '<h3>Earthquake Magnitude</h3>'
// Loop through our intervals and generate a label with a color square for each interval
  for (var i = 0; i < grades.length; i++){
    div.innerHTML +=
      '<i class="legend" style="background:' + colors[i] + '; color:' + colors[i] + ';">....</i>' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '++');
  }
  return div;
};

legend.addTo(myMap);



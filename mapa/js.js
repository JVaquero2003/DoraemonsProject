var map = L.map('map').setView([41.533254, -0.834961], 8.4);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

pasarParametro2();

async function getApi2() {
	let url = 'http://localhost:3000/bushfire'
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

async function pasarParametro2() {
	clearMap();
	var data = await getApi2();
	data.forEach(location => {
		showLocation(location.latitude, location.altitude, location.bright - 273)
	});
}

function showLocation(latitude, longitude, temperature) {
	var circle = L.circle([latitude, longitude], 8000, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	})
		.addTo(map).bindPopup('[' + Math.round(latitude * 100) / 100 + " " + Math.round(longitude * 100) / 100 + "] " + Math.round(temperature) + "ºC");
}

const fs = require("fs");

const fileData = fs.readFileSync("./prueba2.csv", "utf-8");

const allData = fileData.split("\r\n");

allData.shift();

const formateData = allData.map(line => {
	const [, latitude, altitude] = line.split(",");
	return {
		latitude,
		altitude
	}
});

fs.writeFileSync("./prueba2.json", JSON.stringify(formateData, null, 2));

console.log(formateData);

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent('You clicked the map at ' + e.latlng.toString())
		.openOn(map);
}

map.on('click', onMapClick);

function clearMap() {
	for (i in map._layers) {
		if (map._layers[i]._path != undefined) {
			try {
				map.removeLayer(map._layers[i]);
				map.removeLayer(map._marker[i]);
			}
			catch (e) {
				console.log("problem with " + e + map._layers[i]);
			}
		}
	}
}

async function pasarParametro() {
	clearMap();
	var data = await getApi();
	data.forEach(location => {
		showLocation(location.lat, location.long, location.temp, location.satellite)
	});
}

async function getApi() {
	let url = 'http://localhost:3000/fires?month=' + document.getElementById("select").value + '&year=' + document.getElementById("select2").value;
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}
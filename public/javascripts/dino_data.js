"use strict";

$.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB5mleqK0_4n6oCMvSxUfhwBGVb8BWrE1Y", function (locationData) {
	console.log(locationData);
	//variables
	var user_lat = locationData.location["lat"];
	var user_lng = locationData.location["lng"];
	var taxon_name = "tna";
	var early_age = "oei";
	var late_age = "oli";
	var min_ma = "lag";
	var max_ma = "eag";
	var occurance_id = "oid";
	var image_id = "img";
	var longitude = "lng";
	var latitude = "lat";
	var taxon_class = "cll";
	var taxon_order = "odl";
	var taxon_family = "fml";
	var taxon_genus = "gnl";

	var distance = function(lat1, lon1, lat2, lon2, unit) {
		if ((lat1 == lat2) && (lon1 == lon2)) {
			return 0;
		}
		else {
			var radlat1 = Math.PI * lat1 / 180;
			var radlat2 = Math.PI * lat2 / 180;
			var theta = lon1 - lon2;
			var radtheta = Math.PI * theta / 180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180 / Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit == "K") { dist = dist * 1.609344 }
			if (unit == "N") { dist = dist * 0.8684 }
			return dist;
		}
	}

	//PaleoBioDB API - https://paleobiodb.org/data1.2/occs/list.json?datainfo&rowcount&base_name=Dinosauria%20^Aves&interval=Triassic,Cretaceous&show=acconly,class,img,coords
	var paleobiodb = "https://paleobiodb.org/data1.2/occs/list.json?datainfo&rowcount&base_name=Dinosauria%20^Aves&interval=Triassic,Cretaceous&show=acconly,class,img,coords"

	//var haversine = distance(user_lat, user_lng,);
	//&time_rule=overlap&lngmin=" + lngMin + "&lngmax=" + lngMax + "&latmin=" + latMin + "&latmax=" + latMax;

	document.getElementById('clickme').onclick = function clicker(){
		$.getJSON(paleobiodb, function (paleoData) {
			console.log(paleoData);
			//paleoData.records.length
			document.getElementById("table_of_dinosaurs").innerHTML = "";
			for (var i = 0; i < 20; i++) {
				var the_table_row = "";
				var dis = distance(user_lat,user_lng,paleoData.records[i][latitude],paleoData.records[i][longitude],"M");
				var radius = Number(document.getElementById("radius").value);
				console.log(dis);
				console.log(radius);
				if(radius > dis){
				the_table_row = "<tr><td scope=\"row\">" + paleoData.records[i][occurance_id] + "</td><td>" + paleoData.records[i][taxon_name] + "</td><td>" + paleoData.records[i][latitude] + "</td><td>" + paleoData.records[i][longitude] + "</td><td>" + paleoData.records[i][early_age] + "</td><td>" + paleoData.records[i][late_age] + "</td><td>" + paleoData.records[i][min_ma] + "</td><td>" + paleoData.records[i][max_ma] + "</td><td>" + paleoData.records[i][taxon_class] + "</td><td>" + paleoData.records[i][taxon_order] + "</td><td>" + paleoData.records[i][taxon_family] + "</td><td>" + paleoData.records[i][taxon_genus] + "</td><td>" + "<img src=https://paleobiodb.org/data1.2/taxa/thumb.png?id=" + paleoData.records[i][image_id] + ">" + "</td><tr>";    //create table to display dinosaur data
				}
				$("#table_of_dinosaurs").append(the_table_row);
			} // end for loop      
	});  // end the getJSON method.
	}
});




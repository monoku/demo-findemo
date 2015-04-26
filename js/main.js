var map = L.map('map',
		{
			scrollWheelZoom:false
		}).setView([3.461461135046125, -76.51707172393799], 15),
	zero = [255,0,0],
	full = [0,255,0]

var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var ggl = new L.Google('ROADMAP', {});

map.addLayer(ggl);
map.addControl(new L.Control.Layers( {'OSM':osm, 'Google':ggl}, {}));

var polygons = [
	L.polygon([
		L.latLng(3.462403549699641, -76.52084827423096),
		L.latLng(3.4676510686810755, -76.51702880859375),
		L.latLng(3.46475958222967, -76.51561260223389),
		L.latLng(3.4587623969886208, -76.51359558105469),
		L.latLng(3.4571988388843278, -76.51928186416626)], {
			color: 'red'
		}),
	L.polygon([
		L.latLng(3.459447791509075, -76.5267276763916),
		L.latLng(3.460732904898933, -76.52511835098267),
		L.latLng(3.4618038313922668, -76.52445316314697),
		L.latLng(3.461932342490099, -76.523916721344),
		L.latLng(3.4618038313922668, -76.5222430229187),
		L.latLng(3.461075601508514, -76.52114868164062),
		L.latLng(3.4601974411982925, -76.52046203613281),
		L.latLng(3.457455862311414, -76.5194320678711),
		L.latLng(3.4571988388843278, -76.51936769485474),
		L.latLng(3.455185486295979, -76.5246033668518)],
		{
			color: 'green'
		})
	],
	polygonEntities = [],
	actualVal


polygons.map(function( polygon ){
	polygon.addTo( map )
	polygonEntities.push( new Polygon( polygon ) )
})

function Polygon( polygonLayer ){
	var init = Math.random(),
		next = Math.random(),
		mod, val, inverse, color
	
	this.data = []
	
	for(var i=1; i<100; i++){
		mod = i%20
		
		if( mod == 0 ){
			init = next
			next = Math.random()
		}

		val = (mod / 20) * (next - init) + init

		inverse =  1-val
		color = 'rgb('+[Math.floor(inverse*255), Math.floor(val*255), 0].join(',') + ')'

		this.data.push({value: val, color: color})
	}
	this.polygonLayer = polygonLayer
	polygonLayer.setStyle({
		color: this.data[0].color
	})
}


$('#timeline').on('change mousemove', updatePolygons)

function updatePolygons(){
	var val = $('#timeline').val()

	if( val === actualVal) return

	actualVal = val

	polygonEntities.map(function ( polygon ) {
		polygon.polygonLayer.setStyle({
			color: polygon.data[val].color
		})
	})

	var _rad1 = Math.random(),
		rad1 = _rad1 * 90 + 20,
		_rad2 = Math.random(),
		rad2 = _rad2 * 90 + 20,
		_rad3 = Math.random(),
		rad3 = _rad3 * 90 + 20,
		_rad4 = Math.random(),
		rad4 = _rad4 * 90 + 20

	$('#rand-val-1')
		.html(Math.floor(_rad1*100)+'% <br> Homicidios')
		.prev()
			.css({ width: rad1, height: rad1 })
	$('#rand-val-2')
		.html(Math.floor(_rad2*100)+'% <br> Robos')
		.prev()
			.css({ width: rad2, height: rad2 })
	$('#rand-val-3')
		.html(Math.floor(_rad3*100)+'% <br> Suicidios')
		.prev()
			.css({ width: rad3, height: rad3 })
	$('#rand-val-4')
		.html(Math.floor(_rad4*100)+'% <br> Accidentes')
		.prev()
			.css({ width: rad4, height: rad4 })
}

updatePolygons()
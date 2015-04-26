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
		L.latLng(3.4571988388843278, -76.51928186416626)]),
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
		L.latLng(3.455185486295979, -76.5246033668518)]),
	L.polygon([
		L.latLng(3.4677367422188636, -76.5168571472168),
		L.latLng(3.472191755482344, -76.51194334030151),
		L.latLng(3.4702855264165775, -76.51041984558105),
		L.latLng(3.468979007644421, -76.50936841964722),
		L.latLng(3.465487809279689, -76.50857448577881),
		L.latLng(3.463110360074306, -76.51329517364502),
		L.latLng(3.462724827208072, -76.51466846466064),
		L.latLng(3.4646096530615567, -76.51537656784058),
		L.latLng(3.4660018515657836, -76.51655673980713)
		]),
	L.polygon([
		L.latLng(3.465444972409914, -76.50859594345093),
		L.latLng(3.463110360074306, -76.51333808898926),
		L.latLng(3.4626819902132504, -76.5146255493164),
		L.latLng(3.454285901843734, -76.51198625564575),
		L.latLng(3.4537075971028104, -76.5077805519104),
		L.latLng(3.4533220604131554, -76.50548458099365),
		L.latLng(3.461782412874265, -76.50752305984497)
	]),
	L.polygon([
		L.latLng(3.4588909084989585, -76.51342391967773),
		L.latLng(3.4573059319874107, -76.5194320678711),
		L.latLng(3.456877559502512, -76.52054786682129),
		L.latLng(3.4530221984351672, -76.52947425842285),
		L.latLng(3.448181556265284, -76.52780055999756),
		L.latLng(3.450152086142135, -76.51878833770752),
		L.latLng(3.450366273926059, -76.51797294616699),
		L.latLng(3.4458683203299074, -76.51818752288818),
		L.latLng(3.445225753794132, -76.51582717895508),
		L.latLng(3.444883051464298, -76.50926113128662),
		// L.latLng(3.459533465789281, -76.51320934295654)
	])
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
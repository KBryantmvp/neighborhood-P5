var Neighborhood = function() {
    this.mapOptions = {
        center: {lat: 41.9428926, lng: -87.6428802},
        zoom: 14
    };
    // this.myMarker = null;
    this.myMarkers = [];
    this.markers = [
        {
            title: 'Lakeview Athletic Club',
            address: '3212 N Broadway St, Chicago, IL 60657',
            position: { lat: 41.941202, lng: -87.644708 },
        },
        {
            title: 'LA Fitness',
            address: '2828 N Clark St, Chicago, IL 60626',
            position: {lat: 41.933492, lng: -87.645932},
        },
        {
            title: 'Wrigley Field',
            address: '1060 W Addison St, Chicago, IL 60613',
            position: {lat: 41.948426, lng: -87.655384},
        }
    ];
    this.infoWindow = null;
    // console.log(infoWindow);
    // this.currentInfoWindow = new google.maps.InfoWindow(this.markers[0]);
    // this.infoWindowVisible = false;
    // var infoWindow = new google.maps.InfoWindow();
};

Neighborhood.prototype.initialize = function() {
    this.$map_canvas = $('#map-canvas')[0];
    this.map = new google.maps.Map(this.$map_canvas, this.mapOptions);
};

Neighborhood.prototype.createMarkers = function() {
    for (var i = 0; i<this.markers.length; i++) {
        var myMarker = new google.maps.Marker(this.markers[i]);
        console.log(i);
        console.log(myMarker);
        console.log(this.markers[i]);
        this.myMarkers.push(myMarker);
        this.addMarkerEventListener(myMarker);
    }
};

Neighborhood.prototype.addMarkerEventListener = function(marker) {
    var self = this;
    // console.log(self);
    // console.log(self.infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
        // console.log(self.infoWindow);
        self.infoWindow.setContent(marker.title);
        self.infoWindow.open(self.map, marker);
        // var infWin = new MyInfoWindow(this.map, marker);
        // infWin.changeInfoWindowStatus();
    });
};

Neighborhood.prototype.setAllMap = function() {
    for (var i = 0; i<this.myMarkers.length; i++)
        this.myMarkers[i].setMap(this.map);
};

Neighborhood.prototype.createInfoWindow = function() {
    this.infoWindow = new google.maps.InfoWindow();
};

/*****************MyInfoWindow object and its methods*********************************/

// var MyInfoWindow = function(map, marker) {
//     this.infoWindow = new google.maps.InfoWindow({
//         content: marker.title
//     });
//     // this.infoWindowVisible;
//     // this.infoWindow.close();
//     // this.changeInfoWindowStatus();
//     // this.infoWindow.open(map, marker);
// };

// MyInfoWindow.prototype.changeInfoWindowStatus = function() {
//     if (this.infoWindowVisible){
//         this.infoWindow.close();
//         console.log(infoWindowVisible);
//         this.infoWindowVisible = false;
//     } else {
//         this.infoWindowVisible = true;
//     }
// };

var myNeighborhood = new Neighborhood();
myNeighborhood.initialize();
myNeighborhood.createInfoWindow();
// myNeighborhood.addMarkers();
myNeighborhood.createMarkers();
myNeighborhood.setAllMap();

// myNeighborhood.addMarkerListeners();
    // google.maps.event.addDomListener(window, 'load', initialize);

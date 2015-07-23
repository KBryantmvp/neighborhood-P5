var Neighborhood = function() {
    this.mapOptions = {
        center: {lat: 41.9428926, lng: -87.6428802},
        zoom: 14
    };
    this.myMarkers = [];
    this.markers = [
        {
            title: 'Marker 1',
            position: { lat: 41.941202, lng: -87.644708 }
        },
        {
            title: 'Marker 2',
            position: {lat: 41.933492, lng: -87.645932}
        }
    ];
};

Neighborhood.prototype.initialize = function() {
    this.$div = $('div');
    this.map = new google.maps.Map(this.$div[0], this.mapOptions);
};

Neighborhood.prototype.addMarkers = function() {
    for (var i = 0; i<this.markers.length; i++) {
        this.marker = new google.maps.Marker(this.markers[i]);
        this.myMarkers.push(this.marker);
    }
};

Neighborhood.prototype.setAllMap = function() {
    for (var i = 0; i<this.myMarkers.length; i++)
        this.myMarkers[i].setMap(this.map);
};

var myNeighborhood = new Neighborhood();
myNeighborhood.initialize();
myNeighborhood.addMarkers();
myNeighborhood.setAllMap();
    // google.maps.event.addDomListener(window, 'load', initialize);

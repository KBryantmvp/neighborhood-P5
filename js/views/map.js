/*Neighborhood object that creates the map and has the data for the locations that will 
create the markers*/

var Neighborhood = function() {
    this.mapOptions = {
        center: {lat: 41.9428926, lng: -87.6428802},
        zoom: 14
    };

    this.myMarkers = [];
    this.locations = [
        {
            title: 'Lakeview Athletic Club',
            address: '3212 N Broadway St, Chicago, IL 60657',
            position: { lat: 41.941202, lng: -87.644708 },
            // marker: null
        },
        {
            title: 'LA Fitness',
            address: '2828 N Clark St, Chicago, IL 60626',
            position: {lat: 41.933492, lng: -87.645932},
            // marker: null
        },
        {
            title: 'Wrigley Field',
            address: '1060 W Addison St, Chicago, IL 60613',
            position: {lat: 41.948426, lng: -87.655384},
            // marker: null
        }
    ];
    this.infoWindow = new google.maps.InfoWindow();
};

/*Function that displays the Google map*/
Neighborhood.prototype.initialize = function() {
    this.$map_canvas = $('.map-canvas')[0];
    this.map = new google.maps.Map(this.$map_canvas, this.mapOptions);
};

/*Creates the markers by looping through the locations array.
Calls the event listener for each marker*/
Neighborhood.prototype.createMarkers = function() {
    for (var i = 0, len = this.locations.length; i<len; i++) {
        var myMarker = new google.maps.Marker(this.locations[i]);
        this.myMarkers.push(myMarker);
    }
};


/*Creates the Neighborhood object and starts the whole app*/
var myNeighborhood = new Neighborhood();
myNeighborhood.initialize();
myNeighborhood.createMarkers();
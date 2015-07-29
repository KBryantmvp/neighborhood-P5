var ListViewModel = function() {
    self = this;

    self.listMenuVisible = ko.observable(false);

    self.markers = ko.observableArray(myNeighborhood.myMarkers);

    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };

    self.infoWindow = ko.observable(myNeighborhood.infoWindow);
    // self.infoContent = ko.observable();
    // self.
    self.showInfoWindow = function(marker) {
        console.log(marker);
        console.log(marker.position);
        console.log(marker.title);
        // self.infoWindow().setPosition(marker.position);
        self.infoWindow().setContent(marker.title);
        self.infoWindow().open(myNeighborhood.map, marker);
        console.log("test");
    };

    // var infoWindow = new google.maps.InfoWindow({
    //     content = ko.observable(myNeighborhood.markers[0].title);
    // });
};

ko.applyBindings(ListViewModel);
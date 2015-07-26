var ListViewModel = function() {
    self = this;

    self.listMenuVisible = ko.observable(false);

    self.markers = ko.observableArray(myNeighborhood.markers);

    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };

    // self.infoWindow = ko.observable();

    // var infoWindow = new google.maps.InfoWindow({
    //     content = ko.observable(myNeighborhood.markers[0].title);
    // });
};

ko.applyBindings(ListViewModel);
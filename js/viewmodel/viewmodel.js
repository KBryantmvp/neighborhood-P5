var ListViewModel = function() {
    var self = this;

    self.markers = ko.observableArray(myNeighborhood.myMarkers);
    for (i = 0; i<self.markers().length; i++) {
        self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myNeighborhood.map);
    }

    self.listMenuVisible = ko.observable(false);
    self.showListView = function() {
        if(self.listMenuVisible()) {
            self.listMenuVisible(false);
        } else {
            self.listMenuVisible(true);
        }
    };

    self.infoWindow = ko.observable(myNeighborhood.infoWindow);

    self.showInfoWindow = function(marker) {
        self.infoWindow().setContent(marker.title);
        self.infoWindow().open(myNeighborhood.map, marker);
    };


    self.searchInput = ko.observable();

    self.searchFilter = function() {
        var value = self.searchInput() || "";
        // self.listMenuVisible(false);

        for (var i in self.markers()) {
            if(self.markers()[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                // console.log(self.markers()[i].visible());
                self.markers()[i].showItem(true);
                self.markers()[i].setVisible(true);
                console.log(self.markers()[i]);
                // self.showItem(true);
                // console.log(i);
            } else {
                console.log('else:');
                // console.log(self.markers()[i].visible());
                self.markers()[i].showItem(false);
                self.markers()[i].setVisible(false);
                // self.showItem(false);
            }
        }
    };
};

ko.applyBindings(ListViewModel);